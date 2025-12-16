// You're given an sorted array arr of n integers and an integer x.
// Find the floor and ceiling of x in arr[0..n-1].
// Note: The floor of x is the largest element in the 
// array which is smaller than or equal to x.
// Note: The ceiling of x is the smallest element in
// the array greater than or equal to x
//
// Example 1:
// Input Format: n = 6, arr[] ={3, 4, 4, 7, 8, 10}, x= 5
// Result: 4 7
// Explanation: The floor of 5 in the array is 4, and the ceiling of 5 in the array is 7.
//
// Example 2:
// Input Format: n = 6, arr[] ={3, 4, 4, 7, 8, 10}, x= 8
// Result: 8 8
// Explanation: The floor of 8 in the array is 8, and the ceiling of 8 in the array is also 8.

// TC - O(log n) + O(log n) => O(2 log n) ~ O(log n)
// SC - O(1)
function solve(nums: number[], x: number) {
  const n = nums.length
  let low = 0, high = n - 1, mid, floor, ceil

  // Find Floor
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    if (nums[mid]! <= x) {
      floor = nums[mid]!
      low = mid + 1
    }
    else {
      high = mid - 1
    }
  }


  low = 0, high = n - 1

  // Find Ceil
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    if (nums[mid]! >= x) {
      ceil = nums[mid]!
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return [floor || -1, ceil || -1]
}

const res = solve([3, 4, 4, 7, 8, 10], 8)
console.log(res)
