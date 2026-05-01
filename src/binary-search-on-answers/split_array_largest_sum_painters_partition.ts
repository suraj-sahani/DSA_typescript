/*
410. Split Array Largest Sum
Hard
Given an integer array nums and an integer k, 
split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.

Example 1:

Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
Example 2:

Input: nums = [1,2,3,4,5], k = 2
Output: 9
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.
 

Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 10^6
1 <= k <= min(50, nums.length)
*/

// Brute Force Approach.
// These problem follow the same pattern as "Allocate Books"
// We need to find the largest sum so as to that the array can be 
// split into "k" parts.
function brute(nums: number[], k: number) {
  // At first, we need to asuume what is the minimum number,
  // that can be split. We can start from 1 but that does not make sense
  // it the element is not in the input,
  // Thus, we pick the minimum number.
  // For the upper limit, we can assume that all elements can be 
  // all the elements/sum of all the elements
  const min = Math.max(...nums), max = nums.reduce((acc, val) => acc + val, 0)
  // Now, for each value of i, we need to check if the array can be 
  // split into k parts
  for (let i = min; i <= max; i++) {
    const splitCount = findSplitCount(nums, k, i)
    if (splitCount === k) return i
  }

  return -1
}

function findSplitCount(nums: number[], k: number, maxSum: number) {
  const n = nums.length;
  let sum = 0, count = 1;
  for (let i = 0; i < n; i++) {
    // We check if the sum has not exceeded the threshold.
    // If need to increase the split count and also keep track of the 
    // element that needs to added in the next iteration
    if (sum + nums[i]! > maxSum) {
      sum = nums[i]!
      count++;
    } else {
      sum += nums[i]!
    }
  }

  return count
}

const res = brute([7, 2, 5, 10, 8], 2)
console.log(res)
