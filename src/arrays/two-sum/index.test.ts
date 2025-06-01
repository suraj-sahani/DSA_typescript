// twoSum.test.ts
import { test, expect } from "bun:test";
import { twoSum } from ".";

// Helper to validate that indices are correct
function checkTwoSumResult(nums: number[], target: number, result: number[]) {
  const [i, j] = result;
  expect(i).not.toBe(j); // Can't use same index twice
  expect(nums[i!]! + nums[j!]!).toBe(target); // Must sum to target
}

test("Example 1: [2,7,11,15], target 9", () => {
  const nums = [2, 7, 11, 15];
  const target = 9;
  const result = twoSum(nums, target);
  checkTwoSumResult(nums, target, result);
});

test("Example 2: [3,2,4], target 6", () => {
  const nums = [3, 2, 4];
  const target = 6;
  const result = twoSum(nums, target);
  checkTwoSumResult(nums, target, result);
});

test("Example 3: [3,3], target 6", () => {
  const nums = [3, 3];
  const target = 6;
  const result = twoSum(nums, target);
  checkTwoSumResult(nums, target, result);
});

// Edge case: negative numbers
test("Works with negative numbers", () => {
  const nums = [-1, -2, -3, -4, -5];
  const target = -8;
  const result = twoSum(nums, target);
  checkTwoSumResult(nums, target, result);
});

// Edge case: large range values
test("Works with large positive and negative numbers", () => {
  const nums = [1_000_000_000, -1_000_000_000, 2, 0];
  const target = 2;
  const result = twoSum(nums, target);
  checkTwoSumResult(nums, target, result);
});

// Large array with valid pair at end
test("Large array with solution at the end", () => {
  const nums = Array.from({ length: 10_000 }, (_, i) => i);
  nums[9998] = 1_000_000_000;
  nums[9999] = -1_000_000_000;
  const target = 0;
  const result = twoSum(nums, target);
  checkTwoSumResult(nums, target, result);
});
