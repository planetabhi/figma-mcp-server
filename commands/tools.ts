import { Command } from "commander";
import { intro, outro, spinner, select, isCancel, note, log } from "@clack/prompts";
import pc from "picocolors";
import { discoverTools, type ToolWithDefinition } from "../lib/tools.ts";

export function registerToolsCommand(program: Command) {
    program
        .command("tools")
        .description("Explore available API tools")
        .action(async () => {
            console.clear();
            intro(pc.bgCyan(pc.black(" Figma MCP Server ")));

            const s = spinner();
            s.start("Discovering tools...");
            const tools = await discoverTools();
            s.stop(`Found ${tools.length} tools`);

            if (tools.length === 0) {
                note("No tools found.", "Info");
                outro("Done");
                return;
            }

            while (true) {
                const options: { value: ToolWithDefinition | string; label: string; hint?: string }[] = tools.map((t) => ({
                    value: t,
                    label: t.definition.function.name,
                    hint: t.definition.function.description?.slice(0, 50) + (t.definition.function.description && t.definition.function.description.length > 50 ? "..." : "")
                }));

                const selectedTool = await select({
                    message: "Select a tool to view details (Expand)",
                    options: [{ value: 'all', label: pc.cyan('Expand All') }, ...options, { value: 'exit', label: pc.red('Exit') }] as any,
                });

                if (isCancel(selectedTool) || selectedTool === 'exit') {
                    outro("Exited tool explorer");
                    break;
                }

                if (selectedTool === 'all') {
                    console.clear();
                    log.info(pc.magenta(pc.bold("All Tools Details")));

                    tools.forEach(tool => {
                        const def = tool.definition.function;
                        console.log(pc.green(pc.bold(`\nTool: ${def.name}`)));
                        console.log(pc.white(`Description: ${def.description || "No description"}`));

                        if (def.parameters?.properties && Object.keys(def.parameters.properties).length > 0) {
                            console.log(pc.yellow("Parameters:"));
                            Object.entries(def.parameters.properties).forEach(([name, details]) => {
                                console.log(`  ${pc.cyan(name)}: ${pc.dim(details.description || "No description")}`);
                            });
                        } else {
                            console.log(pc.dim("No parameters required."));
                        }
                        console.log(pc.dim("\n────────────────────────────────────────"));
                    });

                    outro("Done");
                    break;
                }

                const tool = selectedTool as ToolWithDefinition;
                const def = tool.definition.function;

                console.clear();
                log.info(pc.magenta(pc.bold(`Tool: ${def.name}`)));
                log.message(pc.white(def.description || "No description"));

                if (def.parameters?.properties && Object.keys(def.parameters.properties).length > 0) {
                    log.info(pc.yellow("Parameters:"));
                    Object.entries(def.parameters.properties).forEach(([name, details]) => {
                        console.log(`  ${pc.cyan(name)}: ${pc.dim(details.description || "No description")}`);
                    });
                } else {
                    log.info(pc.dim("No parameters required."));
                }

                console.log(pc.dim("\n────────────────────────────────────────\n"));

                // Continue loop implicitly acts as "collapse"/"back"
            }
        });
}
