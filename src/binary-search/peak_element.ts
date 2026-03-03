// 162. Find Peak Element
// Medium
// A peak element is an element that is strictly greater than its neighbors.
//
// Given a 0-indexed integer array nums, find a peak element,
// and return its index. If the array contains multiple peaks,
// return the index to any of the peaks.
//
// You may imagine that nums[-1] = nums[n] = -∞.
// In other words, an element is always considered to
// be strictly greater than a neighbor that is outside the array.
//
// You must write an algorithm that runs in O(log n) time.
//
// Example 1:
//
// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.
// Example 2:
//
// Input: nums = [1,2,1,3,5,6,4]
// Output: 5
// Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
//
//
// Constraints:
//
// 1 <= nums.length <= 1000
// -2^31 <= nums[i] <= 2^31 - 1
// nums[i] != nums[i + 1] for all valid i.

// Brute Force Approach
// Iterate through the array and for each item,
// check if the element at i is greater than the element before and after it.
// TC - O(n)
// SC - O(1)

function brute(nums: number[]) {
  const n = nums.length

  for (let i = 0; i < n; i++) {
    // If its the first element, we only can check for the element after it.
    if (i === 0 && nums[i]! > nums[i + 1]!) return i
    // If its the last element, we check the element before it is smaller
    else if (i === n - 1 && nums[i - 1]! < nums[i]!) return i
    // If its an in-between index, 
    // we check if the current element is greater than both the left and right neighbors
    else if (nums[i - 1]! < nums[i]! && nums[i]! > nums[i + 1]!) return i

    // One liner
    // if ((i === 0 || nums[i - 1]! < nums[i]!) && (i === n - 1 || nums[i]! > nums[i + 1]!)) return nums[i]!
  }
}

// Optimal Approach
// Binary Search
// As binary search is dependent on elimination of left/right half,
// We will have to depend on some observations.
// The possiblities of the peak element are as follows:
// 1. Peak is at mid.
// 2. Peak is at the left half.
// 3. Peak is at the right half.
// Also, since we will be checking the previous and the next elements
// to find the peak, it would be better to handle the edge cases for 
// i === 0 and i === n - 1, before starting binary search
// and limit out binary search from low = 1 to high = n - 1.
// TC - O(log n)
// SC - O(1)
// ***************** Note **********************
// This solution works both for single and multi peaks
// Why?
// We know that if the mid is at the peak it will always work but what if it isn't.
// Case 1: Mid is on the decreasing slope, in that case, we knew that the peak will be on the left
// This case will still be true because, even if we discard the right that might or might not have a peak,
// we are still left with the peak on the left. Thus, this solution works for this case.
// Case 2: Mid is on the increasing slope, in this case, we know that the peak will be on the right
// This case will again work as even if we discard the left, we will still have some peak on the right and
// it will be found during the binary search.
function optimal(nums: number[]) {
  const n = nums.length

  // If there is only one element, that will be the peak
  if (n === 1) return 0!
  // If the first element is the peak, return that.
  if (nums[0]! > nums[1]!) return 0
  // Check if the last element is the peak, if it is return that.
  if (nums[n - 1]! > nums[n - 2]!) return n - 1

  // Contraint the search space such that we dont have to check
  // for the first and the last elements
  let low = 1, high = n - 2, mid
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // Check if the mid is the peak and return the index.
    if (nums[mid - 1]! < nums[mid]! && nums[mid]! > nums[mid + 1]!) return mid

    // Maybe the peak is on the right
    // To check this, we can either if the current element is greater
    // than the left element
    // If it is, then the left half is a continuously increasing curve,
    // we can discard it.
    else if (nums[mid]! > nums[mid - 1]!) low = mid + 1
    // Check if the peak is on the left
    // To do this, we check if the element on the right is greater
    // If it is, that means the right half is a continuously increasing curve
    // and we can discard it.
    else if (nums[mid]! > nums[mid + 1]!) high = mid - 1 // verbose case.
    // Edge case
    // Suppose the mid falls in to a valley instead of a peak.
    // Eg: nums = [1,5,1,2,1], mid = 2 => nums[2] = 1
    // We can see that it does not satisfy either 
    // nums[mid] > nums[mid - 1] nor nums[mid] > nums[mid + 1]
    // As a result, it will end up in an infinite loop
    // to stop this, we eliminiate the left half.
    // Note the this is solely for arrays with multiple peaks
    else low = mid + 1
  }

}

const res = optimal([1, 2, 1, 3, 5, 6, 4])
console.log(res)
