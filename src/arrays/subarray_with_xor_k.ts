// Given an array of integers A and an integer B.
// Find the total number of subarrays having bitwise XOR of all elements equal to k.

// Brute Force Appraoch
// Generate all subarrays
// Increase count for each subarray that has xor as K
// TC - O(n^3)
// SC - O(1)

function subarrayXorKBrute(nums: number[], k: number) {
  const n = nums.length
  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let xor = 0

      for (let k = i; k <= j; k++) xor = xor ^ nums[k]!

      if (xor === k) count++
    }
  }

  return count
}


// Better Approach
// We can reduce the time complexity from O(n^3) to O(n^2)
// By removing the kth loop to calculate the xor of subarrays
// TC - O(n^2)
// SC - O(1)
function subarrayXorKBetter(nums: number[], k: number) {
  const n = nums.length
  let count = 0;

  for (let i = 0; i < n; i++) {
    let xor = 0
    for (let j = i; j < n; j++) {
      xor = xor ^ nums[j]!

      if (xor === k) count++
    }
  }

  return count
}

// Optimal Approach
// Follow a similar approach to prefix sum but instead we will be storing the pre-xor
// At each index we will look for a pre-xor of x = xor ^ k
// where xor = XOR or all elements for current i
// Why?
// In prefix sum, the intiution was to see if there are any subarrays,
// before the current index that would make [sum of subarray] + current element = k : k is the required sum
// thus, to do so we would look for k - nums[i] and this would give us 
// the count of all subarrays that had the sum of k - nums[i]
// Same approach here but it is done because 
// x ^ k = XOR => eq 1
// x is all previous array resulting in XOR of required number,
// XOR : xor value of all elements till nums[i],
// XOR both side with k in eq 1
// We do this because xoring the same number will cancel that number
// x ^ k ^ k = XOR ^ k => x = XOR ^ k,
// thus, we look XOR ^ k to get x that is the count of all subarrays with the XOR of x
// TC - O(n)
// TC - O(n)

function subarrayXorKOptimal(nums: number[], k: number) {
  const n = nums.length, preXOR = new Map<number, number>()
  let xor = 0, count = 0
  // Intialize the hashmap 
  preXOR.set(0, 1)

  for (let i = 0; i < n; i++) {
    // Calculate the current xor value
    xor = xor ^ nums[i]!

    // Check if there was pre-xor equal to xor ^ k to get all subarray that resulted in k
    // If found, increase the count to all the values that gave k as the value
    if (preXOR.has(xor ^ k)) count += (preXOR.get(xor) || 0) + 1

    preXOR.set(xor, (preXOR.get(xor) || 0) + 1)

  }

  return count
}

const res = subarrayXorKOptimal([4, 2, 2, 6, 4], 6)
console.log(res)


