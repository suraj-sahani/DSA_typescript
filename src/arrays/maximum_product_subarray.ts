// 152. Maximum Product Subarray
// Medium
// Given an integer array nums, find a subarray that has the largest product, and return the product.
//
// The test cases are generated so that the answer will fit in a 32-bit integer.
//
// Note that the product of an array with a single element is the value of that element.
//
// Example 1:
//
// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
// Example 2:
//
// Input: nums = [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
//
//
// Constraints:
//
// 1 <= nums.length <= 2 * 104
// -10 <= nums[i] <= 10
// The product of any subarray of nums is guaranteed to fit in a 32-bit integer.

// Brute Force Approach
// Generate all subarrays and find the maximum product
// TC - O(n^3)
// SC - O(1)
function brute(nums: number[]) {
  const n = nums.length
  let maxProd = 0

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let subProd = 1

      for (let k = i; k <= j; k++) subProd *= nums[k]!

      maxProd = Math.max(maxProd, subProd)
    }
  }

  return maxProd
}

// Better Approach
// Remove the kth loop to find the product of subarray
// TC - O(n^2)
// SC - O(1)
function better(nums: number[]) {
  const n = nums.length
  let maxProd = 0

  for (let i = 0; i < n; i++) {
    let subProd = 1
    for (let j = i; j < n; j++) {
      subProd *= nums[j]!

      maxProd = Math.max(maxProd, subProd)
    }
  }

  return maxProd
}

// Optimal Approach
// Observations:
// We can get the maximum by any of the following cases:
// Case 1 : All numbers are positive
// Case 2 : Array has even number of negative numbers
// Case 3: Array has odd number of negative numbers and zeros
// Methodology:
// Iterate through the array from both the front and the back at the same time
// While keeping tract of preffixProd and suffixProd
// Every time we encounter a zeros, we reset the value of either preffix or suffixProd,
// As it is quite obvious that it we account for the zero, the entire product will be zero.
// TC - O(n)
// SC - O(1)
function optimal(nums: number[]) {
  const n = nums.length
  let maxProd = Number.MIN_SAFE_INTEGER, prefProd = 1, suffProd = 1

  for (let i = 0; i < n; i++) {
    // Check if the preffixProd or suffixProd is zero,
    // if it is, then it means this will be a new subarray product
    // reset whichever is zero
    if (prefProd === 0) prefProd = 1
    if (suffProd === 0) suffProd = 1


    prefProd *= nums[i]!
    suffProd *= nums[n - i - 1]!
    maxProd = Math.max(maxProd, prefProd, suffProd)
  }

  return maxProd
}

const res = optimal([2, 3, -1, 4])
console.log(res)
