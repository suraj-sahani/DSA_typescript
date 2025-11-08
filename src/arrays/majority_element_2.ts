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

// Optimal approach
// Using the Boyer Moore's vaoting algorithm
// TC - O(n) + O(n) => O(2n) ~ O(n)
// SC - O(1)
function majorityElementOptimal(nums: number[]) {
  const n = nums.length
  let c1 = 0, c2 = 0, el1 = Number.MIN_SAFE_INTEGER, el2 = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < n; i++) {
    if (c1 === 0 && nums[i] !== el2) {
      c1 = 1,
        el1 = nums[i]!
    }
    else if (c2 === 0 && nums[i] !== el1) {
      c2 = 1,
        el2 = nums[i]!
    }

    else if (el1 === nums[i]) {
      c1++
    }
    else if (el2 === nums[i]) {
      c2++
    } else {
      c1--
      c2--
    }
  }

  // Check if el1 & el2 is indeed occurring n/3 times
  c1 = 0, c2 = 0
  for (let i = 0; i < n; i++) {
    if (nums[i] === el1) c1++
    else if (nums[i] === el2) c2++
  }

  let ans = [], maxCount = Math.floor(n / 3)
  if (c1 >= maxCount) ans.push(el1)
  if (c2 >= maxCount) ans.push(el2)

  return ans
}

const res = majorityElementOptimal([1, 1, 1, 3, 3, 2, 2, 2])
console.log(res)
