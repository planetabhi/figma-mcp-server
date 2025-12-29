import { Command } from "commander";
import { registerToolsCommand } from "./commands/tools.ts";

const program = new Command();

registerToolsCommand(program);

program.parse(process.argv);
