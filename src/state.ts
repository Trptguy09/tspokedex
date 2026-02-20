import type { Interface } from "readline"
import { createInterface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
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
        pokeapi: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
    }
}