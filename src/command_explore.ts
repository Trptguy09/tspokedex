import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
if (args.length === 0) {
    console.error("no location area specified");
    return;
}
const areaName = args[0];
const result = await state.pokeapi.fetchLocation(areaName);
console.log(`Exploring ${areaName}...`)
console.log(`Found Pokemon:`)
for (let i = 0; i< result.pokemon_encounters.length; i++) {
    let pokemonName = result.pokemon_encounters[i].pokemon.name;
    console.log(` - ${pokemonName}`)
    }
}