// Given an integer array arr of size N, 
// sorted in ascending order (with distinct values), 
// the array is rotated at any index which is unknown. 
// Find the minimum element in the array.
//
// Examples:
// Input: arr = [4,5,6,7,0,1,2,3]
// Output: 0
// Explanation: The minimum element in the array is 0.
// Input : arr = [3,4,5,1,2]
// Output: 1
// Explanation : The minimum element in the array is 1.
//

import { which } from "bun"


// Brute Force Appraoch
// Iterate over the array while keeping track
// of the minimum number
// TC - O(n)
// SC - O(1)
function brute(nums: number[]) {
  const n = nums.length
  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < n; i++) {
    if (nums[i]! < min) min = nums[i]!
  }

  return min
}

// As we know that we cant directly start eliminating 
// halves on the array since the array is rotated,
// We follow the traditional approach of finding the sorted half.
// For eg: [4,5,6,7,0,1,2], the sorted half is the left half
// But, we can see that right half contains the minimum number.
// For this problem this approach might not work.
// We can see that the point at which the array was rotated,
// can have the minimum number, so we can deduce that unsorted hald will have the minimum.
// But, we cannot definitely say that the point will always have the number. Why?
// E.g.: [7,8,1,2,3,4,5,6], low = 7, high = 6, mid = 2
// We can see that the right half is sorted and it does not contain the minimum
// We can see that the point of rotation is after 8, hence the left portion is not sorted,
// and it contains the minimum number.
// But, [4,5,1,2,3], low = 4, high = 3, mid = 1, the right half is actually sorted
// and in this case, the sorted half contains the minimum
// Conclusion is that the sorted half may or may not have the answer as well as the unsorted half
// may or may not contain the answer
//
// Finally, we will find the minimum from the sorted half
// and find the minimum from the unsorted half.
// Compare both and return the minimum
// TC - O(log n)
// SC - O(1)
function optimal(nums: number[]) {
  const n = nums.length
  let low = 0, high = n - 1, mid, min = Number.MAX_SAFE_INTEGER

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // Check if left half is sorted
    // We check for <= for when the half only has one element
    if (nums[low]! <= nums[mid]!) {
      // Since this is the sorted half,
      // the minimum will be the first number
      if (nums[low]! < min)
        min = nums[low]!

      // Eliminate this half 
      low = mid + 1
    }
    // If the right half is sorted
    // The right half will be from mid to high instead of mid + 1 to high
    else {
      // Minimum will the first element
      // ********** Note ************
      // We check the minimum with mid instead of mid + 1
      // Why?
      // E.g [4,5,1,2,3], low = 4, high = 3, mid = 1
      // Left half = [4,5,1], right = [1,2,3]
      // Since the right half is sorted, the first element is the minimum
      // So, even though the right half is from mid + 1, it is not the first element
      // As the right half is [1,2,3] and mid + 1 = 2, we have to take mid instead of mid + 1
      if (nums[mid]! < min)
        min = nums[mid]!

      // Eliminate this half
      high = mid - 1
    }


  }
  return min
}
const res = optimal([7, 8, 0, 1, 2, 3, 4, 5])
console.log(res)
