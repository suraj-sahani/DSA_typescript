import { describe, expect, test } from "bun:test";
import { maximumProfit } from ".";

describe("maximumProfit", () => {
  test("returns correct profit for sample array", () => {
    expect(maximumProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  test("returns 0 when no profit is possible", () => {
    expect(maximumProfit([7, 6, 4, 3, 1])).toBe(0);
  });

  test("handles array with two elements", () => {
    expect(maximumProfit([1, 10])).toBe(9);
  });

  test("handles array with same values", () => {
    expect(maximumProfit([5, 5, 5, 5])).toBe(0);
  });

  test("handles array with single element", () => {
    expect(maximumProfit([1])).toBe(0);
  });

  test("returns undefined for empty array", () => {
    expect(maximumProfit([])).toBeUndefined();
  });

  test("returns correct profit for complex case", () => {
    expect(maximumProfit([7, 10, 11, 1, 3, 6, 9, 2])).toBe(8);
  });
});
