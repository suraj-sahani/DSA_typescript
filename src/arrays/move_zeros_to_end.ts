// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
// Note that you must do this in-place without making a copy of the array.

// Example 1:
// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]

// Example 2:
// Input: nums = [0]
// Output: [0]

// Brute force approach
// Pick up all the non-zero elements and store them in a temp array
// Fill the remaining indexes with zero's to match the original array
// TC - O(n) + O(n - d) + O(d) = O(2n); d : number of zeros
// SC - O(d)
export function move_zeros_to_end_brute(arr: number[]) {
  const n = arr.length,
    temp = [];

  // Add all non-zero elements to temp
  for (let i = 0; i < n; i++) {
    if (arr[i] !== 0) temp.push(arr[i]!);
  }

  // Put all the non-zero items in the original array
  for (let i = 0; i < temp.length; i++) arr[i] = temp[i]!;

  // Fill the remaining spaces with zero
  // Start looping from temp.length to n as these will be the indexes
  // containing all zeros

  for (let i = temp.length; i < n; i++) arr[i] = 0;
}

// Using 2 pointer aproach, we will take take 2 points
// i and j
// j will always be at a zero
// i will be iterating
// if i if a non-zero number, we swap it with j and j moves forward
// TC - O(n)
// SC - O(1)
export function move_zeros_to_end_optimal(nums: number[]) {
  const n = nums.length;
  let i = 0,
    j = -1;

  // Find the first zero in the array
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      j = i;
      break;
    }
  }

  // Since j is the first zero, all lements before it are non-zero
  // thus we start iterating from j + 1
  i = j + 1;
  while (i < n) {
    // Check each iteration if the element is non-zero
    // If it is, swap with j and increment j
    // This ensures that j is always pointing at 0
    if (arr[i] !== 0) {
      swap(nums, i, j);
      j++;
    }
    i++;
  }
}

function swap(arr: number[], i: number, j: number) {
  const temp = arr[i]!;
  arr[i] = arr[j]!;
  arr[j] = temp;
}

const arr = [1, 0, 3, 4, 1, 0, 0, 7, 2, 5];
move_zeros_to_end_optimal(arr);
console.log(arr);
