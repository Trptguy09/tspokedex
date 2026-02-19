import { State } from "./state.js";

export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!")
    state.rl.close();
    state.pokeapi.stopReapLoop();
    process.exit(0);
}