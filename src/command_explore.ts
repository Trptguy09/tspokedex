import { State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandExplore(state: State): Promise<void> {
    location = state.pokeapi.fetchLocation()
}