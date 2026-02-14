// Problem Statement: Given an integer array arr of size N,
// sorted in ascending order (may contain duplicate values)
// and a target value k. Now the array is rotated at some
// pivot point unknown to you.
// Return True if k is present and otherwise, return False.
//
// Example 1:
// Input Format: arr = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 3
// Result: True
// Explanation: The element 3 is present in the array. So, the answer is True.
//
// Example 2:
// Input Format: arr = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 10
// Result: False
// Explanation: The element 10 is not present in the array. So, the answer is False.

// Brute Force approach
// Iterate through the array and search for the target
// If we find the target, return true else false
function brute(nums: number[], target: number) {
  const n = nums.length

  for (let i = 0; i < n; i++) {
    if (nums[i] === target) return true
  }

  return false
}

// Optimal approach
// If the previous problem, the first step was to identify which half is sorted
// Once we were able to find the sorted half, we would discard the unsorted half 
// and continue binary-search on the sorted half.
// That approach will not work here.
// Example: nums: [6, 7, 1, 2, 3, 4, 4, 5], target : 4
// We can clearly see that [2, 3, 4, 4, 5] is the sorted half
// But, for  nums: [3, 1, 2, 3, 3, 3, 3], 
// low = 0 => nums[0] = 3
// mid = 3 => nums[3] = 3
// high = 6 => nums[6] = 3
// We can clearly see, the low, mid and high are all equal,
// we cannot identify the sorted half programatically
// Fix:
// The problem is that arr[low] === arr[mid] === arr[high]
// thus, whenever we face this conditions, we increment low and decrement high 
// and continue the same process of finding the sorted half
function optimal(nums: number[], target: number) {
  const n = nums.length

  let low = 0, mid, high = n - 1

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    if (nums[low] === nums[mid] && nums[mid] === nums[high]) {
      low++
      high--
      continue
    }

    if (nums[mid] === target) return true

    // Check if left half is sorted
    if (nums[low]! <= nums[mid]!) {
      // Check if the sorted half can contain the target,
      // if it can, update the search space
      if (nums[low]! <= target && target <= nums[mid]!) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    // if the right half is sorted
    else {
      // Check if the target can lie in the right half
      // If it can update the search space
      if (nums[mid + 1]! <= target && target <= nums[high]!)
        low = mid + 1
      else {
        high = mid - 1
      }
    }

  }

  return false
}

const res = optimal([3, 1, 2, 3, 3, 3, 3], -1)
console.log(res)
