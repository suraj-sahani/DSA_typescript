import { describe, expect, test } from "bun:test";
import { reverseInteger } from "./index";

describe("reverseInteger", () => {
  const MAX_INT = Math.pow(2, 31) - 1; // 2147483647
  const MIN_INT = -Math.pow(2, 31); // -2147483648
  test("reverses positive numbers", () => {
    expect(reverseInteger(123)).toBe(321);
    expect(reverseInteger(120)).toBe(21);
  });

  test("handles single digit numbers", () => {
    expect(reverseInteger(5)).toBe(5);
    expect(reverseInteger(0)).toBe(0);
  });

  test("handles numbers with trailing zeros", () => {
    expect(reverseInteger(1000)).toBe(1);
    expect(reverseInteger(1200)).toBe(21);
  });

  test("handles 32-bit integer range", () => {
    expect(reverseInteger(1534236469)).toBe(0); // Result would exceed max 32-bit int
    expect(reverseInteger(2147483647)).toBe(0); // Max 32-bit int
  });

  test("handles basic positive numbers", () => {
    expect(reverseInteger(123)).toBe(321);
    expect(reverseInteger(456)).toBe(654);
  });

  test("handles negative numbers", () => {
    expect(reverseInteger(-123)).toBe(-321);
    expect(reverseInteger(-456)).toBe(-654);
  });

  test("handles zero and single digits", () => {
    expect(reverseInteger(0)).toBe(0);
    expect(reverseInteger(5)).toBe(5);
    expect(reverseInteger(-8)).toBe(-8);
  });

  test("handles numbers with trailing zeros", () => {
    expect(reverseInteger(120)).toBe(21);
    expect(reverseInteger(-120)).toBe(-21);
    expect(reverseInteger(1000)).toBe(1);
  });

  test("handles 32-bit integer range limits", () => {
    expect(reverseInteger(1534236469)).toBe(0); // Would exceed MAX_INT when reversed
    expect(reverseInteger(-1534236469)).toBe(0); // Would exceed MIN_INT when reversed
    expect(reverseInteger(MAX_INT)).toBe(0); // 2147483647
    expect(reverseInteger(MIN_INT)).toBe(0); // -2147483648
  });
});
