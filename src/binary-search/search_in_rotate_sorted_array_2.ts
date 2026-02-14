// Problem Statement: Given an integer array arr of size N,
// sorted in ascending order (may contain duplicate values)
// and a target value k. Now the array is rotated at some
// pivot point unknown to you.
// Return True if k is present and otherwise, return False.
//
// Example 1:
// Input Format: arr = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 3
// Result: True
// Explanation: The element 3 is present in the array. So, the answer is True.
//
// Example 2:
// Input Format: arr = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 10
// Result: False
// Explanation: The element 10 is not present in the array. So, the answer is False.

function brute(nums: number[], target: number) {
  const n = nums.length

  for (let i = 0; i < n; i++) {
    if (nums[i] === target) return true
  }

  return false
}

const res = brute([7, 8, 1, 2, 3, 3, 3, 4, 5, 6], -1)
console.log(res)
