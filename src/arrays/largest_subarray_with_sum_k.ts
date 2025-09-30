// Given an array nums containing only positive numbers and a sum k
// Return the largest subarry with k as its sum 

// Brute force approach
// Generate all subarrys and find which ones add up to k
// Return the subarray that has the greatest length
// TC - O(n^2)
// SC - O(1)

function largest_subarray_k_sum_brute(arr: number[], k: number) {
  const n = arr.length
  let subLength = 0
  // Outer loop for the start of subarry
  for (let i = 0; i < n; i++) {
    // Storing sum of subarry
    let subArraySum = 0
    for (let j = i; j < n; j++) {
      // Find sum of subarry
      subArraySum += arr[j]!
      if (subArraySum === k) {
        subLength = Math.max(subArraySum, j - i + 1)
      }
    }
  }

  return subLength
}

// We use the method of prefix sum and hash map
// With each iteration, we find the sum of all the elements till now
// Once this is calculated, we see if there exists 
// An entry of sum - k in the hash map
// If there is we update the maxLen with the previous existing one
// TC - O(nlogn)
// SC - O(n)
// Note :  *************
// This solutions the optimal for arrays containing zeros and negative numbers
// We cannot do anything better in that case
// If ther array only conatains positive numbers and zeros
// We can use the two pointer approach
function largest_subarray_k_sum_better(arr: number[], k: number) {
  const n = arr.length
  const map = new Map<number, number>()
  let sum = 0, maxLen = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < n; i++) {
    sum += arr[i]!

    // if sum is equal to k, update the maxLen
    if (sum === k) {
      maxLen = Math.max(maxLen, i + 1)
    }

    // Calculate the remainingSum and check if there was a entry that was larger before
    let remainingSum = sum - k
    if (map.has(remainingSum)) {
      let len = i - map.get(remainingSum)!
      maxLen = Math.max(maxLen, len)
    }

    // Add the entry to the map only if the sum was not there
    // to handle the edge case where the array has zeros
    if (!map.has(sum))
      map.set(sum, i)
  }

  return maxLen
}

function largest_subarray_k_sum_optimal(arr: number[], k: number) {
  const n = arr.length
  let i = 0, j = 0, sum = 0, maxLen = Number.MIN_SAFE_INTEGER

  while (j < n) {

    sum += arr[j]!

    if (sum === k) {
      maxLen = Math.max(maxLen, j - i + 1)
    }

    else if (sum > k) {
      sum -= arr[i]!
      i++
    }

    j++
  }

  return maxLen
}

const start = performance.now()
const res = largest_subarray_k_sum_optimal([1, 2, 3, 1, 1, 1, 4, 2, 1], 3)
const end = performance.now()
console.log(`Execution Time: ${(end - start).toFixed(4)}ms`, res)
