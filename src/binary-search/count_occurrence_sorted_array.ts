// Problem Statement: You are given a sorted array 
// containing N integers and a number X,
// you have to find the occurrences of X in the given array.

// Appraoch
// Find the first and last occurrences
// The count will be last - first + 1
function optimal(nums: number[], x: number) {
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
  if (first === -1) return 0

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

  return last - first + 1
}

const res = optimal([1, 2, 2, 3, 4, 4, 4, 4, 5, 6], 9)
console.log(res)

