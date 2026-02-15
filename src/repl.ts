import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { CLICommand } from "./command.js";
import { cleanInput } from "./helper_func.js";
import { commandHelp } from "./command_help.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        }
        //add more commands here
    };
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
        let commands = getCommands();
        const command = commands[words[0]];
        if (command) {
            try {
                command.callback(commands);
            } catch (error: unknown) {
                console.error("An error occured", error);
            }
            rl.prompt();
        } else {
        console.log("Unknown command");
        rl.prompt();
        }
    });
}