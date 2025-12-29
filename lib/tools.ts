import { toolPaths } from "../tools/paths.ts";

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

export async function discoverTools(): Promise<ToolWithDefinition[]> {
    const toolPromises = toolPaths.map(async (file) => {
        const module = await import(`../tools/${file}`);
        return {
            ...module.apiTool,
            path: file,
        } as ToolWithDefinition;
    });
    return Promise.all(toolPromises);
}

export function getFigmaToken(): string {
    const token = process.env.FIGMA_API_KEY;
    if (!token) {
        throw new Error("FIGMA_API_KEY environment variable is not set.");
    }
    return token;
}
