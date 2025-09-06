// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

// Example 1:
// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]

// Example 2:
// Input: nums = [-1,-100,3,99], k = 2
// Output: [3,99,-1,-100]
// Explanation:
// rotate 1 steps to the right: [99,-1,-100,3]
// rotate 2 steps to the right: [3,99,-1,-100]

// Constraints:

//1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 105

// Brute force approach
// Store the first d elements in a temp array
// Loop from d to n - 1 and shift each element to (i - d)th index
// In the end, place the d elements stored in the temp array at the last of the original array
// ---- TC ----
// First loop : O(d)
// Second loop : O(n - d)
// Third loop : O(n - d - n) ~ O(d)
// Total : O(d) + O(n - d) + O(d) = O(n + d)

export function rotate_array_brute(nums: number[], d: number) {
  const n = nums.length;
  const temp = [];

  // For edge cases where d is greater than n
  d %= n;

  // Storing the first d elements in d
  for (let i = 0; i < d; i++) {
    temp[i] = nums[i];
  }

  // Observation is that each elements is shifted i - d indexes
  for (let index = d; index < n; index++) {
    arr[index - d] = arr[index]!;
  }

  // Temp pointer for indexing the temp array
  // Putting back the temp elements at the back of the array

  // Easy way to insert temp using an index variable
  // let i = 0
  // Observation is that any element in the temp array will occupy the (n - d + j)th index in the main array,
  // where n is the size, d is the number of places it is being shifted and j is calculated by  i - (n - d)
  for (let index = n - d; index < n; index++) {
    nums[index] = temp[index - (n - d)]!;
  }
}

// Using reversal algorithm
// The idea is based on the observation that if we left rotate the array by d positions,
// the last (n - d) elements will be at the front and the first d elements will be at the end.
// arr : [1,2,3,4,5,6,7], d = 3
// Reverse the subarray containing the first d elements of the array.
// first d elements : [1,2,3] After reversal => arr : [3,2,1,4,5,6,7]  
// Reverse the subarray containing the last (n - d) elements of the array.
// lasr n - d elements : [4,5,6,7] After reversal => arr : [3,2,1,7,6,5,4]
// Finally, reverse all the elements of the array.
// arr : [3,2,1,7,6,5,4] => [4,5,6,7,1,2,3]

export function rotate_array_optimal(arr: number[], d: number) {
  const n = arr.length

  reverse(arr, 0 , d - 1)
  reverse(arr, d , n - 1)
  reverse(arr, 0, n - 1)
}

function reverse(arr:number[],start:number,end:number){
  while(start <= end){
    const temp = arr[start]!
    arr[start] = arr[end]!
    arr[end] = temp
    start++
    end--
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7];
rotate_array_optimal(arr, 3);
console.log(arr);
