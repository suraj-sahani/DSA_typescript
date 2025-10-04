// Given an array nums of size n, return the majority element.
//
// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
//
//
//
// Example 1:
//
// Input: nums = [3,2,3]
// Output: 3
// Example 2:
//
// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

// Run a nested loops while keeping a maxElement and maxCount variable
// to keep track of the element with the highest count
// TC - O(n^2)
// SC - O(1)
export function majorityElement_brute(nums: number[]): number {
  const n = nums.length, requiredCount = Math.floor(n / 2)
  for (let i = 0; i < n; i++) {
    let count = 0
    for (let j = 0; j < n; j++) {
      if (nums[i] === nums[j]) count++
    }

    if (count > requiredCount) return nums[i]!
  }
  return -1
}

// Use hashmap to store the count of each element
// Return the element with count greater than n/2
// TC - O(n logn n)
// SC - O(n)
export function majorityElement_better(nums: number[]): number {
  const map = new Map<number, number>(), n = nums.length
  for (let i = 0; i < n; i++) {
    map.set(nums[i]!, (map.get(nums[i]!) ?? 0) + 1)
  }

  let majorityElement = -1
  map.entries().forEach(([key, value]) => {
    console.log(key, value, Math.floor(n / 2))
    if (value > Math.floor(n / 2)) majorityElement = key
  })

  return majorityElement || -1
}

// Using Bouer-Moore Voting Algorithm
// Approach:
// Assume the first element is the majority element and set its count to 1
// Loop through the array and if the next element is same as the current element, increment the count
// If the next element is different, decrement the count
// When the count reaches 0, set the next element as the current element and set count to 1
// TC - O(n)
// SC - O(1)
export function majorityElement_optimal(nums: number[]): number {
  let count = 0, candidate = 0
  const n = nums.length
  for (let i = 0; i < n; i++) {
    if (count === 0) candidate = nums[i]!

    if (nums[i] === candidate)
      count += 1

    else
      count -= 1
  }

  return candidate
}

const start = performance.now()
const result = majorityElement_optimal([3, 2, 3])
const end = performance.now()
console.log(`Result: ${result}, Execution time: ${(end - start).toFixed(4)} ms`, result)
