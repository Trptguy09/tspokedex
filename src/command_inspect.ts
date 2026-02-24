import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
    console.error("which pokemon?");
    return;
    }
    const pokemon = args[0];
    if (!(pokemon in state.pokedex)) {
        console.log("you have not caught that pokemon");
        return;
    }
    const data = state.pokedex[pokemon];
    console.log(`Name: ${data.name}`);
    console.log(`Height: ${data.height}`);
    console.log(`Weight: ${data.weight}`);
    console.log(`Stats:`)
    for (let i = 0; i < data.stats.length; i++) {
        console.log(`  -${data.stats[i].stat.name}: ${data.stats[i].base_stat}`);
        }        
    console.log(`Types:`)
    for (let i = 0; i < data.types.length; i++) {
        console.log(`  -${data.types[i].type.name}`)
    }
    return;
}