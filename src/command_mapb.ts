
import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
    if (state.prevLocationsURL === null) {
       console.log("you're on the first page");
       return;
    } else {
        const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);
        state.nextLocationsURL = data.next;
        state.prevLocationsURL = data.previous
        for (let i=0; i < data.results.length; i++) {
            console.log(data.results[i].name)
        }
    }
}