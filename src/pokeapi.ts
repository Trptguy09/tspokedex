import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;
  stopReapLoop() {
    this.cache.stopReapLoop();
  }
  
  constructor(cacheInterval: number = 10_000) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let locationsURL = `${PokeAPI.baseURL}/location-area/`
    
    if (pageURL) {
        locationsURL = pageURL;
    }

    let result = this.cache.get<ShallowLocations>(locationsURL)
    if (result) {
      return result;
    } else {
      try {
        const resp = await fetch(locationsURL);

      if (!resp.ok) {
          throw new Error(`Failed to fetch locations: ${resp.status}`)
      }
      const data: ShallowLocations = await resp.json();
      this.cache.add(locationsURL, data);
      return data;
      } catch(error) {
      console.error("Error fetching locations:", error);
      throw error;
      }
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const name = pokemonName.toLowerCase().trim();
    const pokemonURL = `${PokeAPI.baseURL}/pokemon/${name}`;
    let result = this.cache.get<Pokemon>(pokemonURL);
    if (result) {
      return result;
    } else {
      try {
        const resp = await fetch(pokemonURL);
        if (!resp.ok) {
          throw new Error(`failed to fetch pokemon: ${resp.status}`)
        }
        const raw = await resp.json();
        const data: Pokemon = { id: raw.id, name: raw.name, base_experience: raw.base_experience };
        this.cache.add(pokemonURL, data);
        return data;
      } catch (error) {
        console.error("Error fetching pokemon:", error);
        throw error;
      }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    let singleLocationURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    let result = this.cache.get<Location>(singleLocationURL);
    if (result) {
      return result;
    } else {
      try {
        const resp = await fetch(singleLocationURL);
        if (!resp.ok) {
          throw new Error(`failed to fetch location: ${resp.status}`)
        }
        const data: Location = await resp.json();
        this.cache.add(singleLocationURL, data);
        return data;
      } catch (error) {
        console.error("Error fetching location:", error);
        throw error;
      }
    }
  }
}

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export type Location = {
  id: number;
  name: string;
  location: { name: string; url: string };
  pokemon_encounters: { pokemon: { name: string } }[];
};