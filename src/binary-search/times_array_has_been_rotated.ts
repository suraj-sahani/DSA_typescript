// Problem Statement: 
// Given an integer array arr of size N,
// sorted in ascending order (with distinct values). 
// Now the array is rotated between 1 to N times which is unknown. 
// Find how many times the array has been rotated.
//
// Input : arr = [4,5,6,7,0,1,2,3]
// Result: 4
// Explanation: The original array should be [0,1,2,3,4,5,6,7]. So, we can notice that the array has been rotated 4 times.
//
// Input : arr = [3,4,5,1,2]
// Output : 3
// Explanation: The original array should be [1,2,3,4,5]. So, we can notice that the array has been rotated 3 times.
//

// Brute Force Apprach
// Upon observatin, the index at which the minimum number is present,
// that is the number of times the array has been rotated.
// TC - O(n)
// SC - O(1)
function brute(nums: number[]) {
  const n = nums.length
  let min = Number.MAX_SAFE_INTEGER, min_index = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < n; i++) {
    if (nums[i]! < min) {
      min = nums[i]!
      min_index = i
    }
  }

  return min_index
}

// We will use the same approach for finding minimum
// in sorted rotated array
// TC - O(log n)
// SC - O(1)
function optimal(nums: number[]) {
  const n = nums.length

  let low = 0, high = n - 1, mid, min = Number.MAX_SAFE_INTEGER, min_index = Number.MAX_SAFE_INTEGER

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // Check if left half is sorted
    if (nums[low]! <= nums[mid]!) {
      // minimum number is the first element of the half
      if (nums[low]! < min) {
        min = nums[low]!
        min_index = low
      }

      // eliminate this half
      low = mid + 1
    }
    // Right half is sorted,
    // Note: half is from mid to high and not from mid + 1 to high
    else {
      if (nums[mid]! < min) {
        min = nums[mid]!
        min_index = mid
      }

      high = mid - 1
    }
  }

  return min_index
}

const res = optimal([1, 2, 4, 5, 7])
console.log(res)
