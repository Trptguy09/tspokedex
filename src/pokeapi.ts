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
        const data = await resp.json();
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

export interface Pokemon {
    abilities:                Ability[];
    base_experience:          number;
    cries:                    Cries;
    forms:                    Species[];
    game_indices:             GameIndex[];
    height:                   number;
    held_items:               HeldItem[];
    id:                       number;
    is_default:               boolean;
    location_area_encounters: string;
    moves:                    Move[];
    name:                     string;
    order:                    number;
    past_abilities:           PastAbility[];
    past_stats:               PastStat[];
    past_types:               any[];
    species:                  Species;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
}

export interface Ability {
    ability:   Species | null;
    is_hidden: boolean;
    slot:      number;
}

export interface Species {
    name: string;
    url:  string;
}

export interface Cries {
    latest: string;
    legacy: string;
}

export interface GameIndex {
    game_index: number;
    version:    Species;
}

export interface HeldItem {
    item:            Species;
    version_details: VersionDetail[];
}

export interface VersionDetail {
    rarity:  number;
    version: Species;
}

export interface Move {
    move:                  Species;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at:  number;
    move_learn_method: Species;
    order:             null;
    version_group:     Species;
}

export interface PastAbility {
    abilities:  Ability[];
    generation: Species;
}

export interface PastStat {
    generation: Species;
    stats:      Stat[];
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Species;
}

export interface GenerationV {
    "black-white": Sprites;
}

export interface GenerationIv {
    "diamond-pearl":        Sprites;
    "heartgold-soulsilver": Sprites;
    platinum:               Sprites;
}

export interface Versions {
    "generation-i":    GenerationI;
    "generation-ii":   GenerationIi;
    "generation-iii":  GenerationIii;
    "generation-iv":   GenerationIv;
    "generation-ix":   GenerationIx;
    "generation-v":    GenerationV;
    "generation-vi":   { [key: string]: Home };
    "generation-vii":  GenerationVii;
    "generation-viii": GenerationViii;
}

export interface Other {
    dream_world:        DreamWorld;
    home:               Home;
    "official-artwork": OfficialArtwork;
    showdown:           Sprites;
}

export interface Sprites {
    back_default:       string;
    back_female:        null;
    back_shiny:         string;
    back_shiny_female:  null;
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
    other?:             Other;
    versions?:          Versions;
    animated?:          Sprites;
}

export interface GenerationI {
    "red-blue": RedBlue;
    yellow:     RedBlue;
}

export interface RedBlue {
    back_default:      string;
    back_gray:         string;
    back_transparent:  string;
    front_default:     string;
    front_gray:        string;
    front_transparent: string;
}

export interface GenerationIi {
    crystal: Crystal;
    gold:    Gold;
    silver:  Gold;
}

export interface Crystal {
    back_default:            string;
    back_shiny:              string;
    back_shiny_transparent:  string;
    back_transparent:        string;
    front_default:           string;
    front_shiny:             string;
    front_shiny_transparent: string;
    front_transparent:       string;
}

export interface Gold {
    back_default:       string;
    back_shiny:         string;
    front_default:      string;
    front_shiny:        string;
    front_transparent?: string;
}

export interface GenerationIii {
    emerald:             OfficialArtwork;
    "firered-leafgreen": Gold;
    "ruby-sapphire":     Gold;
}

export interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
}

export interface GenerationIx {
    "scarlet-violet": DreamWorld;
}

export interface DreamWorld {
    front_default: string;
    front_female:  null;
}

export interface Home {
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
}

export interface GenerationVii {
    icons:                  DreamWorld;
    "ultra-sun-ultra-moon": Home;
}

export interface GenerationViii {
    "brilliant-diamond-shining-pearl": DreamWorld;
    icons:                             DreamWorld;
}

export interface Type {
    slot: number;
    type: Species;
}
