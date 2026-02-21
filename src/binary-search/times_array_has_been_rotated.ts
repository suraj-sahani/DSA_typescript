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

const res = brute([4, 5, 6, 7, 0, 1, 2, 3])
console.log(res)
