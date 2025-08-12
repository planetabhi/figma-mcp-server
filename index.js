import { Command } from "commander";
import { registerToolsCommand } from "./commands/tools.js";

const program = new Command();

registerToolsCommand(program);

program.parse(process.argv);