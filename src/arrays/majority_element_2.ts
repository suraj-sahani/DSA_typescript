// 229. Majority Element II
// Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.
//
//
//
// Example 1:
//
// Input: nums = [3,2,3]
// Output: [3]
// Example 2:
//
// Input: nums = [1]
// Output: [1]
// Example 3:
//
// Input: nums = [1,2]
// Output: [1,2]
//
//
// Constraints:
//
// 1 <= nums.length <= 5 * 10^4
// -10^9 <= nums[i] <= 10^9

// Brute Force approach
// Run nested loop and find the count of each element
// If the count is more than floor of n/3 store it
// TC - O(n^2)
// SC - O(1)
function majorityElementBrute(nums: number[]) {
  const n = nums.length, maxCount = Math.floor(n / 3)
  let ans: number[] = []

  for (let i = 0; i < n; i++) {
    // Only run the second loop if the current element
    // Is not already in the answer array or the answer list is empty 
    if (ans.length === 0 || ans[0] !== nums[i]) {
      let c = 0
      for (let j = 0; j < n; j++) {
        if (nums[j] === nums[i])
          c++
      }

      if (c > maxCount) ans.push(nums[i]!)

    }

    if (ans.length === 2) break;
  }

  return ans
}

// Better approach
// Use hashmap to store the count of each element
// TC - O(n)
// SC - O(n)
function majorityElementBetter(nums: number[]) {
  const n = nums.length, maxCount = Math.floor(n / 3),
    map = new Map<number, number>(), ans: number[] = []
  for (let i = 0; i < n; i++) {
    map.set(nums[i]!, (map.get(nums[i]!) || 0) + 1)
    // Only check for count and add it to the list if 
    // it does not exist in the original array
    if (ans.length === 0 || ans[0] !== nums[i]) {
      const currentElCount = map.get(nums[i]!) || 0
      if (currentElCount > maxCount) {
        ans.push(nums[i]!)
      }
    }

    if (ans.length === 2) break
  }

  return ans
}

const res = majorityElementBetter([1, 1, 1, 3, 3, 2, 2, 2])
console.log(res)
