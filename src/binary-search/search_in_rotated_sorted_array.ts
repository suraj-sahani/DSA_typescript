// 33. Search in Rotated Sorted Array
// Medium
// There is an integer array nums sorted in ascending order (with distinct values).
//
// Prior to being passed to your function,
// nums is possibly left rotated at an unknown
// index k (1 <= k < nums.length) such that the
// resulting array is 
// [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
// For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].
//
// Given the array nums after the possible rotation and
// an integer target, return the index of target
// if it is in nums, or -1 if it is not in nums.
//
// You must write an algorithm with O(log n) runtime complexity.
//
//
// Example 1:
//
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:
//
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
// Example 3:
//
// Input: nums = [1], target = 0
// Output: -1
//
//
// Constraints:
//
// 1 <= nums.length <= 5000
// -10^4 <= nums[i] <= 10^4
// All values of nums are unique.
// nums is an ascending array that is possibly rotated.
// -10^4 <= target <= 10^4

// Brute Force Approach
// Iterate linearly to search for the target
// TC - O(n)
// SC - O(1)
function brute(nums: number[], x: number) {
  const n = nums.length

  for (let i = 0; i < n; i++) {
    if (nums[i] === x) return i
  }

  return -1
}

// Optimal Approach
// Since the array is rotated, traditional
// way of limiting the search space would not work
// e.g [6,7,1,2,3,4,5], x = 6, mid = 3, nums[mid] = 2
// Traditionally we would look the right 
// but as we can see, that 6 is on the left of the array.
// To solve this, when we check for the target, if the element
// is not found, we check both the left and the right sections
// to see which part is sorted, and which part is not,
// Once we do this, we can check for the target in the sorted half,
// If we don't find, we repeat updating the search space
// TC - O(log n)
// SC - O(1)
function optimal(nums: number[], x: number) {
  const n = nums.length
  let low = 0, high = n - 1, mid

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    if (nums[mid] === x) return mid

    // Check if the left half is sorted
    else if (nums[low]! <= nums[mid]!) {
      // Check if the target lies in this half
      // If it is,element can be in the left,
      // discard the right half
      if (nums[low]! <= x && x <= nums[mid]!) {
        high = mid - 1
      }
      // If its not,element can be in the right half,
      // discard the left half
      else {
        low = mid + 1
      }
    }

    // If right half is sorted
    else {
      // Check if target lies in the right half
      // if it is, element can be in the right half
      if (nums[mid]! <= x && x <= nums[high]!) low = mid + 1
      // If its not, element can be in the left half
      else high = mid - 1
    }
  }

  return -1
}

const res = optimal([6, 7, 1, 2, 3, 4, 5], 9)
console.log(res)
