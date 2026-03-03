// 162. Find Peak Element
// Medium
// A peak element is an element that is strictly greater than its neighbors.
//
// Given a 0-indexed integer array nums, find a peak element,
// and return its index. If the array contains multiple peaks,
// return the index to any of the peaks.
//
// You may imagine that nums[-1] = nums[n] = -∞.
// In other words, an element is always considered to
// be strictly greater than a neighbor that is outside the array.
//
// You must write an algorithm that runs in O(log n) time.
//
// Example 1:
//
// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.
// Example 2:
//
// Input: nums = [1,2,1,3,5,6,4]
// Output: 5
// Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
//
//
// Constraints:
//
// 1 <= nums.length <= 1000
// -2^31 <= nums[i] <= 2^31 - 1
// nums[i] != nums[i + 1] for all valid i.

// Brute Force Approach
// Iterate through the array and for each item,
// check if the element at i is greater than the element before and after it.
// TC - O(n)
// SC - O(1)

function brute(nums: number[]) {
  const n = nums.length

  for (let i = 0; i < n; i++) {
    // If its the first element, we only can check for the element after it.
    if (i === 0 && nums[i]! > nums[i + 1]!) return nums[i]!
    // If its the last element, we check the element before it is smaller
    else if (i === n - 1 && nums[i - 1]! < nums[i]!) return nums[i]!
    // If its an in-between index, 
    // we check if the current element is greater than both the left and right neighbors
    else if (nums[i - 1]! < nums[i]! && nums[i]! > nums[i + 1]!) return nums[i]!

    // One liner
    // if ((i === 0 || nums[i - 1]! < nums[i]!) && (i === n - 1 || nums[i]! > nums[i + 1]!)) return nums[i]!
  }
}

const res = brute([5, 4, 3, 2, 1])
console.log(res)
