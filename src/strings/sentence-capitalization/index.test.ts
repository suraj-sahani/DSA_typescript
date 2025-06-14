import { expect, test, describe } from "bun:test";
import { capitalizeFirstWord } from "./index";

describe("capitalizeFirstWord", () => {
  test("capitalizes first letter of each word in a simple sentence", () => {
    expect(capitalizeFirstWord("hello world")).toBe("Hello World");
  });

  test("handles single word", () => {
    expect(capitalizeFirstWord("hello")).toBe("Hello");
  });

  test("handles empty string", () => {
    expect(capitalizeFirstWord("")).toBe("");
  });

  test("handles multiple spaces between words", () => {
    expect(capitalizeFirstWord("hello   world")).toBe("Hello   World");
  });

  test("handles already capitalized words", () => {
    expect(capitalizeFirstWord("Hello World")).toBe("Hello World");
  });

  test("handles mixed case words", () => {
    expect(capitalizeFirstWord("heLLo wORld")).toBe("HeLLo WORld");
  });

  test("handles sentence with numbers", () => {
    expect(capitalizeFirstWord("hello 123 world")).toBe("Hello 123 World");
  });
});
