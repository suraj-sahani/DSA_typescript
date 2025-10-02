// Given an array arr[] consisting of only 0s, 1s, and 2s.
// The objective is to sort the array, i.e., put all 0s first, then all 1s and all 2s in last.

// Brute force approach
// Sort the array
// TC - O(n log n)
// SC - O(1)
export function sort012_brute(arr: number[]): number[] {
  return arr.sort((a: number, b: number) => a - b)
}

// Better Approach
// Loop through the array and count the number of 0s, 1s and 2s
// Modify the array based on the counts
// TC - O(n) + O(n) => O(2n) => O(n)
// SC - O(1)
export function sort012_better(arr: number[]) {
  const n = arr.length
  let zeroCount = 0, oneCount = 0, twoCount = 0

  for (let i = 0; i < n; i++) {
    if (arr[i] === 0) zeroCount++
    else if (arr[i] === 1) oneCount++
    else twoCount++
  }

  let i = 0

  while (zeroCount > 0 && i < n) {
    arr[i++] = 0
    zeroCount--
  }

  while (oneCount > 0 && i < n) {
    arr[i++] = 1
    oneCount--
  }

  while (twoCount > 0 && i < n) {
    arr[i++] = 2
    twoCount--
  }

  return arr
}

// Optimal Approach - Dutch National Flag Algorithm
// Divide the array into three sections: 0s, 1s, and 2s
// arr[0 .. low - 1] → All 0s
// arr[low .. mid - 1] → All 1s
// arr[mid .. high] → Unprocessed elements (unknown)
// arr[high + 1 .. n - 1] → All 2s
// TC - O(n)
// SC - O(1)

export function sort012_optimal(arr: number[]) {
  const n = arr.length
  let low = 0, mid = 0, high = n - 1

  while (mid < high) {
    if (arr[mid] === 0) {
      swap(arr, low, mid)
      low++
      mid++
    }

    else if (arr[mid] === 1) {
      mid++
    }

    else {
      swap(arr, mid, high)
      high--
    }
  }

  return arr
}

function swap(arr: number[], i: number, j: number) {
  const temp = arr[i]!
  arr[i] = arr[j]!
  arr[j] = temp
}

const start = performance.now()
const result = sort012_optimal([0, 1, 2, 0, 1, 2, 1, 0, 2, 1, 0])
const end = performance.now()
console.log(`Execution time: ${(end - start).toFixed(4)} ms`, result)
