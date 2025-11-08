// 15. 3Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
//
// Notice that the solution set must not contain duplicate triplets.
//
//
//
// Example 1:
//
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation: 
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.
// Example 2:
//
// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.
// Example 3:
//
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.
//
//
// Constraints:
//
// 3 <= nums.length <= 3000
// -10^5 <= nums[i] <= 10^5

// Brute force approach
// Run a 3 layer nested loop
// At each iteration check if the sum is 0
// if it is add it to a set 
function Sum3Brute(nums: number[]) {
  const n = nums.length, ans: number[][] = []
  const st = new Set<string>()
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i]! + nums[j]! + nums[k]! === 0) {
          const temp = [nums[i]!, nums[j]!, nums[k]!].sort((a, b) => a - b)
          st.add(temp.toString())
        }
      }
    }
  }

  st.forEach(val => {
    const strArr = val.split(',').map(s => Number(s))
    ans.push(strArr)
  })

  return ans
}

const res = Sum3Brute([-1, 0, 1, 2, -1, -4])
console.log(res)
