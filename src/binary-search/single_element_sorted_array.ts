// 540. Single Element in a Sorted Array
// Medium
// You are given a sorted array consisting of 
// only integers where every element appears exactly 
// twice, except for one element which appears exactly once.
//
// Return the single element that appears only once.
//
// Your solution must run in O(log n) time and O(1) space.
//
//
//
// Example 1:
//
// Input: nums = [1,1,2,3,3,4,4,8,8]
// Output: 2
// Example 2:
//
// Input: nums = [3,3,7,7,10,11,11]
// Output: 10
//
//
// Constraints:
//
// 1 <= nums.length <= 105
// 0 <= nums[i] <= 105

// Brute force approach
// Run a nested loop to find the count of each element
// If any element has the count of 1, return that element
// TC - O(n^2)
// SC - O(1)
function brute(nums: number[]) {
  const n = nums.length
  let lastEl = -1 // Keep track of the last element to prevent checking for already checked number
  for (let i = 0; i < n; i++) {
    // If the current element is the same as the last element,
    // skip checking
    if (nums[i] === lastEl) continue
    lastEl = nums[i]!
    let count = 1
    for (let j = i + 1; j < n; j++) {
      if (nums[i] === nums[j]) count++

    }
    if (count === 1) return nums[i]
  }
  return -1
}

// This is a single iteration approach
// where, for any index i, since the array is sorted and contains duplicates,
// either the left or the right element will have the duplicates
// Using this we can solve this problem as well
// TC - O(n)
// SC - O(1)
function brute2(nums: number[]) {
  const n = nums.length

  for (let i = 0; i < n; i++) {
    // Edge case for first element
    // the element before it is not present, thus we check on to the right
    if (i === 0) {
      if (nums[i] !== nums[i + 1]) return nums[i]
    }
    // Edge for for the last element,
    // the element to the right is not available, thus we check with the element before it
    else if (i === n - 1) {
      if (nums[i] !== nums[i - 1]) return nums[i]
    }
    // Check for both left and right
    else {
      if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i]
    }
  }

  return -1
}

// Keep a hashmap with the count of all element
// iterate through the map and return the element that 
// has count as 1
// TC - O(n)
// SC - O(n)
function better(nums: number[]) {
  const n = nums.length, m = new Map<number, number>()
  let nonRepeated = -1
  // Store count of each element
  for (let i = 0; i < n; i++) {
    m.set(nums[i]!, (m.get(nums[i]!) || 0) + 1)
  }

  m.forEach((val, key) => {
    if (val === 1) nonRepeated = key
  })

  return nonRepeated
}


function optimal(nums: number[]) {

}

const res = brute2([1, 1, 2, 3, 3, 4, 4, 8, 8])
console.log(res)
