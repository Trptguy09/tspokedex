import { describe, expect, test } from "vitest";
import { cleanInput } from "./helper_func.js";

describe.each([
    {
        input: "Hello world  ",
        expected: ["hello", "world"],
    },
    
    {
        input: "TeSTinG  RAnDomCapital  Extra spACe ",
        expected: ["testing", "randomcapital", "extra", "space"],
    },

    {
        input: "  Leading space",
        expected: ["leading", "space"]
    },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
   let actual = cleanInput(input);
   expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});