
import { commandExit } from "./command_exit.js";
import { CLICommand, State} from "./state.js"
import { cleanInput } from "./helper_func.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

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
        },
        map: {
            name: "map",
            description: "Displays next 20 map locations",
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "Displays last 20 map locations",
            callback: commandMapb
        },
        explore: {
            name: "explore",
            description: "Explores an area for pokemon",
            callback: commandExplore
        },
        catch: {
            name: "catch",
            description: "Attempt to catch a pokemon",
            callback: commandCatch
        }
        //add more commands here=
    };
}

export function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.rl.prompt();
            return;
        }
        const command = state.commands[words[0]];
        if (command) {
            try {
                await command.callback(state, ...words.slice(1));
            } catch (error) {
                console.error("An error occured", error);
            }
        } else {
        console.log("Unknown command");
        }
    state.rl.prompt();
    });
}