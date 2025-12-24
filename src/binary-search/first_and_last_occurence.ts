// 34. Find First and Last Position of Element in Sorted Array
// Medium
// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
//
// If target is not found in the array, return [-1, -1].
//
// You must write an algorithm with O(log n) runtime complexity.
//
// Example 1:
//
// Input: nums = [5,7,7,8,8,8,8,10], target = 8
// Output: [3,7]
// Example 2:
//
// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]
// Example 3:
//
// Input: nums = [], target = 0
// Output: [-1,-1]
//
//
// Constraints:
//
// 0 <= nums.length <= 10^5
// -10^9 <= nums[i] <= 10^9
// nums is a non-decreasing array.
// -10^9 <= target <= 10^9


// Brute Force Approach
// Iterate through the array
// If target is found and there was no value of
// the first occurrence, then that is the first occurenece and maybe the last,
// thus we update both first and last occurrence values,
// continue iterating and update last occurrence is the target is found
// TC - O(n)
// SC - O(1)
function brute(nums: number[], x: number) {
  const n = nums.length
  let fOcc = -1, lOcc = -1

  for (let i = 0; i < n; i++) {
    // Check if the current number is the target
    if (nums[i] === x) {
      // If it is set the value of first occurrence only if
      // it was not set before
      if (fOcc === -1) fOcc = i
      // Update last everytime
      lOcc = i
    }
  }

  return [fOcc, lOcc]
}

// We will use the same principal of lower and upper bound
// Lower Bound : Smallest index where nums[i] >= x  => First occurrence
// Upper Bound : Smallest index where nums[i] > x => Last occurrence
// TC - Lower Bound : O(log n) + Upper Bound : O(log n) => O(2 log n) ~ O(log n)
// SC - O(1)
function optimal(nums: number[], x: number) {
  const n = nums.length

  let low = 0, high = n - 1, fOcc = -1, lOcc = -1, mid


  // Find the first occurrence using lower bound
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    if (nums[mid]! >= x) {
      fOcc = mid
      // We need the smallest index
      high = mid - 1
    } else
      low = mid + 1
  }

  // Find the last occurrence using upper bound
  low = 0, high = n - 1

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    if (nums[mid]! > x) {
      lOcc = mid
      // We need the smallest index, thus we need to search before
      high = mid - 1
    } else low = mid + 1
  }

  // We should not be sure that this will be the answer.
  // Why? 
  // Example 1: x = 10,
  // Lower Bound = 8,
  // Upper Bound = 8
  // But the number is not in the array, it should return -1
  // Example 2: x = 14,
  // Lower bound = 8
  // Lower bound will be "n", i.e outside the array
  // Thus, before returning, we check that 
  // The if the lower bound is outside the size of the array => Example 2
  // or
  // If the element at the lower bound is not the target => Example 1,
  // Where the element is not in the array but there are elements greater than
  // the target, we will get a value of the lower bound,
  // We can say that the element does not exist in the array
  // and thus, return [-1,-1]
  if (fOcc === n || nums[fOcc] !== x) return [-1, -1]

  // We are subtracting -1 from the last occurrence,
  // becuase upper bound gives the the index where the number is greater 
  // than the target and since we require the index of the last occurrence
  // we subtract it from the index where the element is greater than the target
  return [fOcc, lOcc - 1]
}

// We dont really need to rely on the upper bound
// and lower bound concepts
// TC - O(2 log n)
// SC - O(1)
function optimalV2(nums: number[], x: number) {
  const n = nums.length

  let low = 0, high = n - 1, first = -1, last = -1, mid

  // Finding first occurence
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // Check if current number is equal ot x
    // if it is,update first and since we want the first index,
    // we limit our search space to the left side
    if (nums[mid]! === x) {
      first = mid
      high = mid - 1
    }
    // If current value is less than x,
    // then x can be on the right half
    else if (nums[mid]! < x) low = mid + 1

    // If current number is greater than the target,
    // we limit the search space to the left side
    else
      high = mid - 1
  }

  low = 0, high = n - 1

  // If there is no first occurence
  // then there also will be no last occurrence,
  // thus we return [-1,-1]
  if (first === -1) return [-1, -1]

  // Finding last occurence
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // If the current value is equal to x,
    // if can be out last occurence and since we need the last 
    // occurence, we update our search space to the right side
    if (nums[mid] === x) {
      last = mid,
        low = mid + 1
    }
    // If the current value is smaller than x,
    // we update the search space to the right
    else if (nums[mid]! < x) low = mid + 1

    // If current value is greater than x,
    // we need to limit the search space to the left side
    else high = mid - 1
  }

  return [first, last]
}

const res = optimalV2([2, 2, 4, 4, 8, 8, 8, 8, 11, 13], 10)
console.log(res)
