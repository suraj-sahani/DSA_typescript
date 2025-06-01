// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

// Constraints:

// 2 <= nums.length <= 104
// -10^9 <= nums[i] <= 10^9
// -10^9 <= target <= 10^9
// Only one valid answer exists.

// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

// Two loops approach - Do a nested loop search and return the numbers that are matching the target.
// T - O(n^2)
// S - O(1)
// export const twoSum = (
//   arr: [number, number] | number[],
//   target: number
// ): number[] => {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i]! + arr[j]! === target) return [i, j];
//     }
//   }
//   return [];
// };

// Optimized Approach - Use a map to store the complement of the current number.
// T - O(n)
// S - O(n)
export const twoSum = (arr: number[], target: number): number[] => {
  const complements = new Map<number, number>();

  for (let i = 0; i < arr.length; i++) {
    const requiredNumber = target - arr[i]!;
    // Check if the complement of the current number exists in the map
    if (complements.has(requiredNumber))
      return [i, complements.get(requiredNumber)!];
    // If it does not, set the value in the map in the following format : number, index.
    // Storing in this format allows for easy access to the index of the number
    complements.set(arr[i]!, i);
  }

  return [];
};

const result = twoSum([1_000_000_000, -1_000_000_000, 2, 0], 2);
console.log(result);
