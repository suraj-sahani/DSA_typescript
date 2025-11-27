// Problem Statement: Given an array of N integers,
// count the inversion of the array (using merge-sort).
//
// Inversion of an array: for all i & j < size of array,
// if i < j then you have to find pair (A[i],A[j]) such that A[j] < A[i].

// Brute Force Approach
// Run a nested loop to generate pairs
// Increase count if nums[i] > nums[j]
// TC - O(n^2)
// SC - O(1)
function brute(nums: number[]) {
  const n = nums.length
  let count = 0

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i]! > nums[j]!) {
        console.log([nums[i], nums[j]])
        count++
      }
    }
  }

  return count
}

const res = brute([5, 3, 2, 4, 1])
console.log(res)
