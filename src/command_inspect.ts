import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
    console.error("which pokemon?");
    return;
    }
    const pokemon = args[0];
    if (!(pokemon in pokedex)) {
        console.log("you have not caught that pokemon")
    }
    const data = state.cache.get(pokemon);
    console.log(`Name: ${data.name}`);
    console.log(`Height: ${data.height}`);
    console.log(`Weight: ${data.weight}`);
    console.log(`Stats:`)
    console.log(`   -hp: ${data.stats.hp}`);
    console.log(`   -attack: ${data.stats.attack}`);
    console.log(`   -defense: ${data.stats.defense}`);
    console.log(`   -special-attack: ${data.stats.specialAttack}`);
    console.log(`   -special-defense: ${data.stats.specialDefense}`);
    console.log(`   -speed: ${data.stats.speed}`);
    console.log(`Types:`)
    console.log(`- ${data.Types.type}`)
}