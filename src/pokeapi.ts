export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let locationsURL = `${PokeAPI.baseURL}/location-area/`
    
    if (pageURL) {
        locationsURL = pageURL;
    }
    try {
        const resp = await fetch(locationsURL);

    if (!resp.ok) {
        throw new Error(`Failed to fetch locations: ${resp.status}`)
    }
    const data: ShallowLocations = await resp.json();
    return data;
    } catch(error) {
    console.error("Error fetching locations:", error);
    throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    let singleLocationURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

    try {
      const resp = await fetch(singleLocationURL);

      if (!resp.ok) {
        throw new Error(`failed to fetch location: ${resp.status}`)
      }
      const data: Location = await resp.json();
      return data;
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  }
}

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
  pokemon_encounters: unknown[];
};