import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

export interface ApiTool {
    definition: {
        type: 'function';
        function: {
            name: string;
            description?: string;
            parameters?: {
                type: string;
                properties: Record<string, any>;
                required?: string[];
            };
        };
    };
    function: (args: any) => Promise<any>;
}

export type ToolWithDefinition = ApiTool & { path: string };

const toolsDir = fileURLToPath(new URL("../tools", import.meta.url));

export async function discoverTools(): Promise<ToolWithDefinition[]> {
    const glob = new Bun.Glob("figma/**/*.ts");
    const tools: ToolWithDefinition[] = [];
    for await (const file of glob.scan({ cwd: toolsDir })) {
        const module = await import(pathToFileURL(path.join(toolsDir, file)).href);
        const apiTool = module.apiTool as ApiTool | undefined;
        if (!apiTool?.definition?.function?.name) continue;
        tools.push({ ...apiTool, path: file } as ToolWithDefinition);
    }
    tools.sort((a, b) =>
        a.definition.function.name.localeCompare(b.definition.function.name)
    );
    return tools;
}

export function getFigmaToken(): string {
    const token = process.env.FIGMA_API_KEY;
    if (!token) {
        throw new Error("FIGMA_API_KEY environment variable is not set.");
    }
    return token;
}

const FIGMA_BASE_URL = "https://api.figma.com";

export interface FigmaRequestOptions {
    method?: string;
    query?: Record<string, string | number | boolean | undefined | null>;
    body?: unknown;
}

// Shared Figma request helper: encodes query params, sends JSON bodies, and
// tolerates empty/204 responses and non-JSON error bodies.
export async function figmaRequest(endpoint: string, options: FigmaRequestOptions = {}): Promise<any> {
    const { method = "GET", query, body } = options;
    const url = new URL(`${FIGMA_BASE_URL}${endpoint}`);
    if (query) {
        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== null && value !== "") {
                url.searchParams.append(key, String(value));
            }
        }
    }

    const headers: Record<string, string> = { "X-Figma-Token": getFigmaToken() };
    let payload: string | undefined;
    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
        payload = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), { method, headers, body: payload });
    const text = await response.text();
    let data: any;
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }
    }

    if (!response.ok) {
        const message = (data && (data.message || data.err)) || response.statusText;
        throw new Error(`Figma API Error: ${message}`);
    }

    return data ?? { success: true, status: response.status };
}

