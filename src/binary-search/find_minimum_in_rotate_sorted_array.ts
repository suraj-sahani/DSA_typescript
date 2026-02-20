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

const res = brute([3, 4, 5, 1, 2])
console.log(res)
