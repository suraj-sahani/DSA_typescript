// 485. Max Consecutive Ones
// Given a binary array nums, return the maximum number of consecutive 1's in the array.
//
//
//
// Example 1:
//
// Input: nums = [1,1,0,1,1,1]
// Output: 3
// Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
// Example 2:
//
// Input: nums = [1,0,1,1,0,1]
// Output: 2
//
//
// Constraints:
//
// 1 <= nums.length <= 105
// nums[i] is either 0 or 1


// Iterate through the array while keeping track 
// Of current consecutive lenght and a largest length
// Every time we encounter a zero, the current length is set to zero
// While updating the largest length
// TC - O(n)
// SC - O(1)
function count_max_consecutive_ones(arr: number[]) {
  const n = arr.length
  let currentOneCount = 0, maxOneCount = 0

  for (let i = 0; i < n; i++) {
    if (arr[i] === 1) currentOneCount++
    else {
      maxOneCount = Math.max(currentOneCount, maxOneCount)
      currentOneCount = 0
    }
  }

  // Edge Case
  // If there are only consecutive ones at the end, the maxOneCount
  // does not get updated
  // To handle this we return the maximum value between
  // currentOneCount and maxOneCount as currentOneCount will always have
  // the current value
  return Math.max(maxOneCount, currentOneCount)
}

const res = count_max_consecutive_ones([1, 1, 0, 1, 1, 1, 1, 1])
console.log(res)
