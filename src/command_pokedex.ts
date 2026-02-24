import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:")
    for (const name in state.pokedex) {
        console.log(` - ${name}`)
    }
    return;
}