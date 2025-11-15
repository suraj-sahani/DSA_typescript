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

const res = subarrayXorKBetter([4, 2, 2, 6, 4], 6)
console.log(res)


