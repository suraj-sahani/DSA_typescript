// Implement Lower Bound
//
// Problem Statement: Given a sorted array of N integers and an integer x,
// write a program to find the lower bound of x.
//
// What is lower bound?
// The lower bound algorithm finds the first or the smallest index
// in a sorted array where the value at that index is greater than or equal to a given key i.e. x.
//
// The lower bound is the smallest index, ind, where arr[ind] >= x.
// But if any such index is not found, the lower bound
// algorithm returns n i.e. size of the given array.

// TC - O(log n)
// SC - O(1)
function lower_bound(nums: number[], target: number) {
  const n = nums.length

  let low = 0, high = n - 1, bound = n, mid

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // If the number at the current index matches the condition,
    // We can say that this could be our answer
    // But we need to find the smallest possible index, thus, we 
    // narrow our search before this and update high
    if (nums[mid]! >= target) {
      bound = mid
      high = mid - 1
    }
    // If the condition does not match, there could be a index
    // in the second half, thus we update the search space to the right
    else {
      low = mid + 1
    }
  }

  return bound
}

const res = lower_bound([1, 2, 3, 5, 7, 8, 11, 14, 15, 19], 11)
console.log(res)
