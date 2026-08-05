#!/usr/bin/env bun

import { createServer } from "node:http";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
    Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { discoverTools, type ToolWithDefinition } from "./lib/tools.ts";
import pkg from "./package.json" with { type: "json" };

// Bun auto-loads .env from the working directory; no dotenv needed.
if (!process.env.FIGMA_API_KEY) {
    console.error("Error: FIGMA_API_KEY environment variable is required.");
    process.exit(1);
}

const SERVER_NAME = process.env.SERVER_NAME || pkg.name;
const SERVER_VERSION = process.env.SERVER_VERSION || pkg.version;
const DEFAULT_PORT = 3001;

async function transformTools(tools: ToolWithDefinition[]): Promise<Tool[]> {
    return tools
        .map((tool) => {
            const definitionFunction = tool.definition?.function;
            if (!definitionFunction) return undefined;
            return {
                name: definitionFunction.name,
                description: definitionFunction.description,
                inputSchema: definitionFunction.parameters,
            } as Tool;
        })
        .filter((t): t is Tool => t !== undefined);
}

async function setupServerHandlers(
    server: Server,
    tools: ToolWithDefinition[],
    transformedTools: Tool[]
) {
    const toolMap = new Map(
        tools.map((tool) => [tool.definition.function.name, tool])
    );

    server.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: transformedTools,
    }));

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const toolName = request.params.name;
        const tool = toolMap.get(toolName);
        if (!tool) {
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${toolName}`);
        }
        const args = request.params.arguments || {};
        const requiredParameters =
            tool.definition?.function?.parameters?.required || [];
        for (const requiredParameter of requiredParameters) {
            if (!(requiredParameter in args)) {
                throw new McpError(
                    ErrorCode.InvalidParams,
                    `Missing required parameter: ${requiredParameter}`
                );
            }
        }
        try {
            const result = await tool.function(args);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result, null, 2),
                    },
                ],
            };
        } catch (error: any) {
            console.error("[Error] Failed to fetch data:", error);
            throw new McpError(
                ErrorCode.InternalError,
                `API error: ${error.message}`
            );
        }
    });
}

async function run() {
    const args = process.argv.slice(2);
    const isSSE = args.includes("--sse");
    const tools = await discoverTools();
    const transformedTools = await transformTools(tools);

    if (isSSE) {
        const transports: Record<string, SSEServerTransport> = {};
        const servers: Record<string, Server> = {};

        const httpServer = createServer(async (req, res) => {
            const url = new URL(req.url ?? "/", "http://localhost");

            if (req.method === "GET" && url.pathname === "/sse") {
                const server = new Server(
                    {
                        name: SERVER_NAME,
                        version: SERVER_VERSION,
                    },
                    {
                        capabilities: {
                            tools: {},
                        },
                    }
                );
                server.onerror = (error) => console.error("[Error]", error);
                await setupServerHandlers(server, tools, transformedTools);

                const transport = new SSEServerTransport("/messages", res);
                transports[transport.sessionId] = transport;
                servers[transport.sessionId] = server;

                res.on("close", async () => {
                    delete transports[transport.sessionId];
                    await server.close();
                    delete servers[transport.sessionId];
                });

                await server.connect(transport);
                return;
            }

            if (req.method === "POST" && url.pathname === "/messages") {
                const sessionId = url.searchParams.get("sessionId");
                if (!sessionId) {
                    res.statusCode = 400;
                    res.end("Invalid or missing sessionId");
                    return;
                }

                const transport = transports[sessionId];
                const server = servers[sessionId];

                if (transport && server) {
                    await transport.handlePostMessage(req, res);
                } else {
                    res.statusCode = 400;
                    res.end("No transport/server found for sessionId");
                }
                return;
            }

            res.statusCode = 404;
            res.end("Not found");
        });

        const port = process.env.PORT || DEFAULT_PORT;
        httpServer.listen(port, () => {
            console.log(`[SSE Server] running on port ${port}`);
            console.log(`[Server] Name: ${SERVER_NAME}`);
            console.log(`[Server] Version: ${SERVER_VERSION}`);
        });
    } else {
        const server = new Server(
            {
                name: SERVER_NAME,
                version: SERVER_VERSION,
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );
        server.onerror = (error) => console.error("[Error]", error);
        await setupServerHandlers(server, tools, transformedTools);

        process.on("SIGINT", async () => {
            await server.close();
            process.exit(0);
        });

        const transport = new StdioServerTransport();
        await server.connect(transport);
    }
}

run().catch(console.error);
