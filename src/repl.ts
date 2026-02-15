
import { commandExit } from "./command_exit.js";
import { CLICommand, State} from "./state.js"
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

export function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on("line", (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.rl.prompt();
            return;
        }
        const command = state.commands[words[0]];
        if (command) {
            try {
                command.callback(state);
            } catch (error: unknown) {
                console.error("An error occured", error);
            }
            state.rl.prompt();
        } else {
        console.log("Unknown command");
        state.rl.prompt();
        }
    });
}