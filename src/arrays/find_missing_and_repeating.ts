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
    // as out goal has been achi
    if (missing !== -1 && repeating !== -1) break
  }

  return { missing, repeating }
}


// Better Approach
// Take a hashmap storing the count of all elements
// Return the missing and repeating
// TC - O(2n) ~ O(n)
// SC - O(n)
function better(nums: number[]) {
  const n = nums.length
  const hash = Array.from({ length: n + 1 }).fill(0) as number[]


  // const map = new Map<number, number>()
  // Intialize the map to set count to all elements from 1 - n as 0
  // for (let i = 1; i <= n; i++) map.set(i, 0)

  // for (let i = 1; i <= n; i++)
  // map.set(nums[i - 1]!, (map.get(nums[i - 1]!) || 0) + 1)

  // map.forEach((val, key) => {
  //   console.log(key, val)
  //   if (val === 2) repeating = key
  //   else if (val === 0) missing = key
  //
  //  if (missing !== -1 && repeating !== -1) return
  // })


  for (let i = 0; i < n; i++) {
    hash[nums[i]!]!++
  }


  let missing = -1, repeating = -1
  for (let i = 1; i < hash.length; i++) {
    if (hash[i] === 0) missing = i
    else if (hash[i] === 2) repeating = i

    if (missing !== -1 && repeating !== -1) break
  }


  return { missing, repeating }
}
const res = better([4, 3, 6, 2, 1, 1])
console.log(res)
