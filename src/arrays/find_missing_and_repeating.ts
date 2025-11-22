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

// Optimal Approach 1
// We mainly use the technique of finding the sum of first n natural numbers,
// Then build up on top of this by using basic algebric equations to find the 
// missing and repeating numbers
// TC - O(2n) ~ O(n)
// SC - O(1)
function optimal1(nums: number[]) {
  const n = nums.length

  let x = -1, y = -1 // x => repeating, y => missing
  let sNums = 0,
    sAll = n * (n + 1) / 2 // Sum of first n natural numbers

  //Calculate the sum of all numbers in input array
  for (let i = 0; i < n; i++) sNums += nums[i]!

  // Mathematical Observation
  // If we subtract sNums - sAll we will only be left with the difference 
  // of the repeating and missing numbers as all the common elements will cancel
  // each other out 
  const diffXY = sNums - sAll // EQ 1 : x - y = diffXY

  let sNumsSq = 0, sAllSq = (n * (n + 1) * ((2 * n) + 1)) / 6 // using this formula to get sum of squares of first n natural number

  //Calculate the sum of squares all numbers in input array
  for (let i = 0; i < n; i++) sNumsSq += Math.pow(nums[i]!, 2)

  //Calculate the sum of squares all natural numbers till
  // for (let i = 1; i <= n; i++) sAllSq += Math.pow(i, 2)

  // If we subtract both the squares, we will get the difference
  // between the square of the repeating and the square of the missing
  const diffXYSq = sNumsSq - sAllSq // EQ 2 : x^2 - y^2 = diffXYSq

  // We know that x^2 - y^2 = (x + y) * (x - y)
  // Since we already have the value of (x - y) => diffXY, 
  // we can get the value of (x + y) = (x^2 - y^2) / (x - y)
  const sumXY = diffXYSq / diffXY // EQ 3 : (x + y)  = sumXY

  // Adding EQ 1 and EQ 3, we get
  // x + y = sumXY
  // x - y = diffXY
  // 2x = sumXY + diffXY => x = (sumXY + diffXY) / 2
  // then , we get y by putting the value of x in either EQ 1 or EQ 3
  // Therefore using EQ 1, we get y = sumXY - x
  x = (sumXY + diffXY) / 2
  y = sumXY - x

  return { missing: y, repeating: x }
}

const res = optimal1([4, 3, 6, 2, 1, 1])
console.log(res)
