import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        //add more commands here
    };
}

export function cleanInput(input: string): string[] {
    return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w !== "");
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();
    rl.on("line", (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }
        let command= getCommands();
        if (command) {
            command.callback()
        }
        rl.prompt();
        return
    });
}
