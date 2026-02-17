
import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    if (state.nextLocationsURL === null) {
        const data = await state.pokeapi.fetchLocations();
        state.nextLocationsURL = data.next;
        state.prevLocationsURL = data.previous;
        for (let i=0; i < data.results.length; i++) {
            console.log(data.results[i].name)
        }
    } else {
        const data = await state.pokeapi.fetchLocations(state.nextLocationsURL);
        state.nextLocationsURL = data.next;
        state.prevLocationsURL = data.previous
        for (let i=0; i < data.results.length; i++) {
            console.log(data.results[i].name)
        }
    }
}