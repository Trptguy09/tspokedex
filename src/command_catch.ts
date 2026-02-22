import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    
    if (args.length === 0) {
        console.error("Which Pokemon?");
        return;
    }
    const name = args[0].toLowerCase()
    console.log(`Throwing a Pokeball at ${name}...`);

    try {
        const data = await state.pokeapi.fetchPokemon(name);
        const roll = Math.floor(Math.random() * 100);

        if (roll > data.base_experience) {
            state.pokedex[name] = data;
            console.log(`${name} was caught!`)
            return;
        } else {
            console.log(`${name} escaped!`)
        }
    } catch (error) {
        throw new Error("unable to throw pokeball")
    }
}