// 18. 4Sum
// Medium
// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
//
// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.
//
//
//
// Example 1:
//
// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// Example 2:
//
// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]
//
//
// Constraints:
//
// 1 <= nums.length <= 200
// -10^9 <= nums[i] <= 10^9
// -10^9 <= target <= 10^9

// Brute Force Approach
// Run a 4 level nested loop
// If the sum of all elements is equal to the target, 
// push it into the quad arrays
// TC - O(n^4)
// SC - O(2^number of quads), one for the set stroing unique quad and another 
// for returning the quads
function sum4Brute(nums: number[], target: number) {
  const n = nums.length, ans: number[][] = [], st = new Set<string>()

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        for (let l = k + 1; l < n; l++) {
          if (nums[i]! + nums[j]! + nums[k]! + nums[l]! === target) {
            const quad = [nums[i]!, nums[j]!, nums[k]!, nums[l]!].sort((a, b) => a - b)
            st.add(JSON.stringify(quad))
          }
        }
      }
    }
  }

  st.forEach(val => ans.push(JSON.parse(val)))

  return ans
}

const res = sum4Brute([1, 0, -1, 0, -2, 2], 0)
console.log(res)
