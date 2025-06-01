// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

// Example 1:

// Input: nums = [1,2,3,1]

// Output: true

// Explanation:

// The element 1 occurs at the indices 0 and 3.

// Example 2:

// Input: nums = [1,2,3,4]

// Output: false

// Explanation:

// All elements are distinct.

// Example 3:

// Input: nums = [1,1,1,3,3,4,3,2,4,2]

// Output: true

// Constraints:

// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109

// Basic implementation of a function that checks if an array contains duplicated elements
// T : O(n^2)
// S : O(n)
// const containsDuplicates = (arr: number[]): boolean => {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] === arr[j]) return true;
//     }
//   }
//   return false;
// };

// Use an object to check existing items
// T: O(n)
// S: O(n)
// const containsDuplicates = (arr: number[]): boolean => {
//   let items: Record<number, number> = {};
//   for (const val of arr) {
//     if (items[val]) return true;
//     items[val] = 1;
//   }

//   return false;
// };

// Create a set to contain only unique items
// T: O(n) - When creating an Set from an array, the array has to looped. Thus, the time complexity is O(n)
// S: O(n)
// const containsDuplicates = (arr: number[]): boolean => {
//   const uniqueItems = new Set(arr);
//   return uniqueItems.size < arr.length;
// };

// Sort the input array, loop through to check if any adjacents items are similar.
// T: O(n * log n)
// S : O(1)
export const containsDuplicates = (arr: number[]): boolean => {
  const sortedItems = arr.sort();

  for (let i = 0; i < sortedItems.length; i++)
    if (arr[i] === arr[i + 1]) return true;

  return false;
};

const result = containsDuplicates([1, 9, 4, 5]);
console.log(result);
