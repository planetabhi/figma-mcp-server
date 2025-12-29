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
