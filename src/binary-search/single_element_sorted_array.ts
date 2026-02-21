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

  // Edge case for single element array
  if (n === 0) return nums[0]!

  for (let i = 0; i < n; i++) {
    // Edge case for first element
    // the element before it is not present, thus we check on to the right
    if (i === 0) {
      if (nums[i] !== nums[i + 1]) return nums[i]!
    }
    // Edge for for the last element,
    // the element to the right is not available, thus we check with the element before it
    else if (i === n - 1) {
      if (nums[i] !== nums[i - 1]) return nums[i]!
    }
    // Check for both left and right
    else {
      if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i]!
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

// Binary Search
// Observation:
// arr : [1,1,2,2,3,3,4,5,5,6,6]
// If we observe, we can see that on the left half of the single element,
// The first occurrence of the element is on the even index and the next occurrence
// is on the odd index
// Similarly, if we look to the right half of the single element,
// The first occurrence is an odd index and the next occurrence is an even index.
// Conclusions:
// So, in Binary Search, if we are in the (even, odd) pattern,
// then the single element is on the right half
// And if we are in the (odd, even), the single element is 
// on the left half. 
// We can see this surely.
// There is also edge cases while doing Binary Search,
// where we will have to check the left
// and the right to find the duplicates and for this, we will have to handle
// edge case where either the left or the right is not present.
// To prevent this, we will take low as 1 instead of 0 and high as n - 2 instead of n - 1
// and handle those previosuly mentioned case before we implement Binary Search
// TC - (log n)
// SC - O(1)
function optimal(nums: number[]) {
  const n = nums.length

  // Handling edge case before starting Binary Search
  if (n === 1) return nums[0]!
  if (nums[0] !== nums[1]) return nums[0]!
  if (nums[n - 1] !== nums[n - 1]) return nums[n - 1]!

  let low = 1, high = n - 2, mid;
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // Check if mid is single element
    if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1]) return nums[mid]

    // Figure out which half will cannot contain the single element
    // and eliminate it.
    // (even, odd) => eliminate the left half as element is on the right
    // (odd, even) => element the right half as element is on the left
    // How?
    // Case 1: Standing at an odd index
    // If the current index is odd and the element before it is the same as the 
    // current index, that mean we are on the left half
    // eliminate the left half
    // else
    // If the current index is odd and the element before is not the same, then
    // we are on the right half, thus, element the right half
    // Case 2: Standing at an even index
    // If the current index is even and the next element is the same as the current 
    // index, we are on the left half eliminate it.
    // else
    // If the current index is even and the element before it is the same as the current,
    // we are on the right half, eliminate it.

    // If we are standing at an odd index we check with the right
    // If we are at an even index, we check with the left
    // We are on the left half and the single element is on the right
    // So we eliminate the left half
    if ((mid % 2 !== 0 && nums[mid - 1] === nums[mid]) || (mid % 2 === 0 && nums[mid] === nums[mid + 1])) {
      low = mid + 1
    }
    // If the above case are not satisfying, that means
    // We are on the right half and the single element is on the left
    // So we eliminate the right half
    else {
      high = mid - 1
    }
  }

}

const res = optimal([1, 1, 2, 2, 3, 3, 4, 5, 5, 8, 8])
console.log(res)
