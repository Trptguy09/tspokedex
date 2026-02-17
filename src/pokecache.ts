export type CacheEntry<T> =  {
    createdat: number,
    val: T,
}

export class Cache{
    #cache = new Map<string, CacheEntry<any>>();
}

export function add<T>(key: string, val: T) {
    //add new entry to chache object
}

export function get<T>(key: string): CacheEntry | undefined {
    //get new cache object from key
}