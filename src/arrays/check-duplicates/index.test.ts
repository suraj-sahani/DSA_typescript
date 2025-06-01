import { test, expect } from "bun:test";
import { containsDuplicates } from ".";

// ✅ Within constraints: array with no duplicates
test("Returns false for array with unique values", () => {
  const arr = [1, 2, 3, 4, 5]; // 1 <= length <= 10^5, -10^9 <= nums[i] <= 10^9
  expect(containsDuplicates(arr)).toBe(false);
});

// ✅ Within constraints: array with duplicates
test("Returns true for array with duplicates", () => {
  const arr = [10, -10, 20, -10]; // -10^9 <= nums[i] <= 10^9
  expect(containsDuplicates(arr)).toBe(true);
});

// ✅ Minimum valid length
test("Returns false for single-element array", () => {
  expect(containsDuplicates([999999999])).toBe(false); // length = 1
});

// ✅ All elements same, valid range
test("Returns true for array with repeated large value", () => {
  const arr = Array(100).fill(1_000_000_000); // within bounds
  expect(containsDuplicates(arr)).toBe(true);
});

// ✅ Large array with no duplicates, max length and valid value range
test("Returns false for large array with unique elements", () => {
  const arr = Array.from({ length: 100_000 }, (_, i) => -1_000_000_000 + i); // values in bounds
  expect(containsDuplicates(arr)).toBe(false);
});

// ✅ Large array with one duplicate, valid range
test("Returns true for large array with one duplicate at the end", () => {
  const arr = Array.from({ length: 99_999 }, (_, i) => -1_000_000_000 + i);
  arr.push(-1_000_000_000); // add a duplicate
  expect(containsDuplicates(arr)).toBe(true);
});
