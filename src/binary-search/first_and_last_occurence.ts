// 34. Find First and Last Position of Element in Sorted Array
// Medium
// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
//
// If target is not found in the array, return [-1, -1].
//
// You must write an algorithm with O(log n) runtime complexity.
//
// Example 1:
//
// Input: nums = [5,7,7,8,8,8,8,10], target = 8
// Output: [3,7]
// Example 2:
//
// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]
// Example 3:
//
// Input: nums = [], target = 0
// Output: [-1,-1]
//
//
// Constraints:
//
// 0 <= nums.length <= 10^5
// -10^9 <= nums[i] <= 10^9
// nums is a non-decreasing array.
// -10^9 <= target <= 10^9

function brute(nums: number[], x: number) {
  const n = nums.length
  let fOcc = -1, lOcc = -1

  for (let i = 0; i < n; i++) {
    // Check if the current number is the target
    if (nums[i] === x) {
      // If it is set the value of first occurenece only if
      // it was not set before
      if (fOcc === -1) fOcc = i
      // Update last everytime
      lOcc = i
    }
  }

  return [fOcc, lOcc]
}

function solve(nums: number[], x: number) {
  const n = nums.length

  let low = 0, high = n - 1, fOccurenece = -1, lOccurence = -1, mid

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // Check in element at the middle is equal to target and the previous element
    // Is smaller than the target
    // If it is, then mid is the first occurenece
    if (nums[mid] === x && nums[mid - 1]! < x) fOccurenece = mid
    // If the element at mid is equal to target and the next element
    // Is greater, then mid is the last occurenece
    else if (nums[mid] === x && nums[mid + 1]! > x) lOccurence = mid
  }

  return [fOccurenece, lOccurence]
}

const res = brute([2, 2, 4, 4, 8, 8, 8, 8, 11, 13], 8)
console.log(res)
