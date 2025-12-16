// Implement Upper Bound
//
// Problem Statement: Given a sorted array of N integers 
// and an integer x, write a program to find the upper bound of x.
//
// What is Upper Bound?
// The upper bound algorithm finds the first or 
// the smallest index in a sorted array where the 
// value at that index is greater than the given key i.e. x.
//
// The upper bound is the smallest index, ind, where arr[ind] > x.

function upper_bound(nums: number[], target: number) {
  const n = nums.length
  let low = 0, high = n - 1, bound = n, mid

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // If the number at the current index matches the condition,
    // We can say that this could be our answer
    // But we need to find the smallest possible index, thus, we 
    // narrow our search before this and update high
    if (nums[mid]! > target) {
      bound = mid
      high = mid - 1
    }
    // If condition does not satisfy, look at the right
    else
      low = mid + 1
  }

  return bound
}

const res = upper_bound([2, 3, 6, 7, 8, 8, 11, 11, 11, 12], 2)
console.log(res)
