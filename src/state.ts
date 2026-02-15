import type { Interface } from "readline"
import { createInterface } from "readline";
import { getCommands } from "./repl.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
};

export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    return {
        rl: rl,
        commands: getCommands(),
    }
}