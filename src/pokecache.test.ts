import { Cache } from "./pokecache.js";
import { test, expect, describe } from "vitest";

describe("Cache (Reap-based expiration)", () => {
  test("returns undefined for missing keys", () => {
    const cache = new Cache(1000);

    expect(cache.get("missing")).toBe(undefined);

    cache.stopReapLoop();
  });

  test("stores and retrieves values", () => {
    const cache = new Cache(1000);

    cache.add("url", "pikachu");

    expect(cache.get("url")).toBe("pikachu");

    cache.stopReapLoop();
  });

  test("overwrites existing keys", () => {
    const cache = new Cache(1000);

    cache.add("same", "first");
    cache.add("same", "second");

    expect(cache.get("same")).toBe("second");

    cache.stopReapLoop();
  });

  test("stores multiple independent entries", () => {
    const cache = new Cache(1000);

    cache.add("a", "alpha");
    cache.add("b", "beta");

    expect(cache.get("a")).toBe("alpha");
    expect(cache.get("b")).toBe("beta");

    cache.stopReapLoop();
  });

  test("removes entries after reap interval passes", async () => {
    const cache = new Cache(200);

    cache.add("temp", "data");

    // wait long enough for reap loop to run
    await new Promise((r) => setTimeout(r, 350));

    expect(cache.get("temp")).toBe(undefined);

    cache.stopReapLoop();
  });

  test("keeps newer entries while deleting old ones", async () => {
    const cache = new Cache(300);

    cache.add("old", "first");

    // let this entry age
    await new Promise((r) => setTimeout(r, 200));

    cache.add("new", "second");

    // wait long enough for reap
    await new Promise((r) => setTimeout(r, 200));

    expect(cache.get("old")).toBe(undefined);
    expect(cache.get("new")).toBe("second");

    cache.stopReapLoop();
  });

  test("stopReapLoop prevents cleanup from running", async () => {
    const cache = new Cache(150);

    cache.add("persist", "value");

    cache.stopReapLoop();

    // wait longer than interval
    await new Promise((r) => setTimeout(r, 400));

    // entry should still exist because reap loop stopped
    expect(cache.get("persist")).toBe("value");
  });

  test("handles object values correctly", () => {
    const cache = new Cache(1000);

    cache.add("poke", { name: "charmander", hp: 39 });

    expect(cache.get("poke")).toEqual({ name: "charmander", hp: 39 });

    cache.stopReapLoop();
  });

  test("handles empty string keys", () => {
    const cache = new Cache(1000);

    cache.add("", "blank-key");

    expect(cache.get("")).toBe("blank-key");

    cache.stopReapLoop();
  });
});
