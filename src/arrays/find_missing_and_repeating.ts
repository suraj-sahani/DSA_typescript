// Given an array of size n, where the array contains
// elements from 1 to n, find the repeating and missing number


// Brute Force Approach
// Run a nested for loop
// Outer loop to run fro elements from 1 to n
// Inner loop to iterate over the array
// For each elements keep a count, if count is 2
// then that is the repeating number 
// If count is 0 then it is the missing number
// TC - O(n^2)
// SC - O(1)
function brute(nums: number[]) {
  const n = nums.length
  let missing = -1, repeating = -1

  for (let i = 1; i <= n; i++) {
    let count = 0
    for (let j = 0; j < n; j++) {
      if (nums[j] === i) count++
    }
    if (count === 2) repeating = i
    else if (count === 0) missing = i

    // Terminate the loop if we found both repeating and missing
    // as out goal has been achieved
    if (missing !== -1 && repeating !== -1) break
  }

  return { missing, repeating }
}

const res = brute([4, 3, 6, 2, 1, 1])
console.log(res)
