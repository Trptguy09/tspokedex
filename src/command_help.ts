import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!\nUsage:\n\n");
    for (const command of Object.values(commands)) {
    console.log(`${command.name}: ${command.description}`)
    }
}