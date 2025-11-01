// 560. Subarray Sum Equals K
// Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
//
// A subarray is a contiguous non-empty sequence of elements within an array.
//
// Example 1:
//
// Input: nums = [1,1,1], k = 2
// Output: 2
// Example 2:
//
// Input: nums = [1,2,3], k = 3
// Output: 2
//
//
// Constraints:
//
// 1 <= nums.length <= 2 * 10^4
// -1000 <= nums[i] <= 1000
// -10^7 <= k <= 10^7


// Brute Force Approach
// Generate all subarrays and check their sums
// If it is equal to k, increment the count
// TC - O(N^3)
// SC - O(1)
function subArrayCountBrute(nums: number[], t: number) {
  const n = nums.length;
  let count = 0

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let subArraySum = 0
      // Calculate subarray sum from i to j
      for (let k = i; k <= j; k++) {
        subArraySum += nums[k]!
      }

      if (subArraySum === t)
        count++

    }
  }

  return count
}

// Better Approach
// Skipping the extra loop to generate the subarray sum
// TC - O(N^2)
// SC - O(1)

function subArrayCountBetter(nums: number[], t: number) {
  const n = nums.length
  let count = 0

  for (let i = 0; i < n; i++) {
    let subArraySum = 0
    for (let j = i; j < n; j++) {
      subArraySum += nums[j]!

      if (subArraySum === t) count++
    }
  }

  return count
}

// Optimal Approach
// Use the prefix sum and hashmap to store the frequency of prefix sums
// TC - O(n)
// SC - O(n)
function subArrayCountOptimal(nums: number[], t: number) {
  const n = nums.length, map = new Map<number, number>()
  let count = 0, sum = 0

  map.set(0, 1) // To handle the case when the prefix sum itself is equal to t

  for (let i = 0; i < n; i++) {
    sum += nums[i]!

    // Increase the count for current sum equal to t
    if (sum === t) count++

    // Check if previously there is a prefix sum exists such that currentSum - previousSum = t
    if (map.has(sum - t))
      count += map.get(sum - t) || 0

    map.set(sum, map.get(sum) || 0 + 1)
  }

  return count
}

const res = subArrayCountOptimal([1, 2, 3, -3, 1, 1, 1, 4, 2, -3], 3)
console.log(res)
