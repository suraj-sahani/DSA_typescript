// Given an array nums containing n distinct numbers in the range [0, n],
// return the only number in the range that is missing from the array.


// Brute force approach
// Run nested loops and iterate to check if a certain element
// is present in the array or not
// TC - O(n^2)
// SC - O(1)
function find_missing_number_brute(arr: number[]) {
  const n = arr.length
  let count = 0;
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[j] === i) {
        console.log(`Found ${i}`)
        count = 1
        break
      }
    }

    if (count === 0) return i
    count = 0
  }
}

// Create a hash map of all the elements, in the following form
// number , count
// Loop through the hash map and find the element that has the count of 0
// TC - O(2n)
// SC - O(n)
function find_missing_number_better(arr: number[]) {
  const n = arr.length
  const map = new Map()

  // iterate through the given array and set 
  // the count of each item to 1
  for (let i = 0; i < n; i++) {
    map.set(arr[i], 1)
  }

  // Since the items can range from 0 - 1
  // Loop through 0 to n and check if the map has that item
  // if it does not, return in
  for (let i = 0; i <= n; i++) {
    if (!map.has(i)) return i
  }

  return -1
}

// Optimal Approaches
// Approach 1 - Using Sum of n natural numbers
// Find the sum of n natural numbers using n*(n+1)/2
// Loop through the array to find the incomplete sum
// Subtract to get the answer
function find_missing_number_optimal_1(arr: number[]) {
  const n = arr.length
  const sumOfN = (n * (n + 1)) / 2
  let missingNumSum = 0

  for (let i = 0; i < n; i++) {
    missingNumSum += arr[i]!
  }

  return sumOfN - missingNumSum
}

// Approach 2
// We use bit manipulation namely, xor
// a ^ a = 0
// We loop from 0 to n ,
// for each iteraction calculate the value of total n elements
// while taking a xor for the elements in the array
// finally we xor both the respective xor values
// The numbers that exist will cancel each other out
// and the remaining value will be left

function find_missing_number_optimal_2(arr: number[]) {
  const n = arr.length
  let xor1 = 0, xor2 = 0;

  for (let i = 0; i < n; i++) {
    xor1 = xor1 ^ arr[i]!
    xor2 = xor2 ^ (i + 1)
  }

  return xor1 ^ xor2
}

const res = find_missing_number_optimal_2([9, 6, 4, 2, 3, 5, 7, 0, 1])
console.log(res)
