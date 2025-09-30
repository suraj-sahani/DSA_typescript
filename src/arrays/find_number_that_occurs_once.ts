// 136. Single Number
// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
//
// You must implement a solution with a linear runtime complexity and use only constant extra space.
//
// Example 1:
// Input: nums = [2,2,1]
// Output: 1

// Example 2:
// Input: nums = [4,1,2,1,2]
// Output: 4
//
// Example 3:
// Input: nums = [1]
// Output: 1
//
// Constraints:
// 1 <= nums.length <= 3 * 104
// -3 * 10^4 <= nums[i] <= 3 * 10^4
// Each element in the array appears twice except for one element which appears only once.

// Using the xor operator the ones that are repeated twice cancel
// each other out and the one that appears once is left.
function find_number_that_occurs_once(arr: number[]) {
  const n = arr.length
  let ans = 0

  for (let i = 0; i < n; i++) {
    ans = ans ^ arr[i]!
  }

  return ans
}

const res = find_number_that_occurs_once([1, 1, 2, 3, 3, 4, 4])
console.log(res)

