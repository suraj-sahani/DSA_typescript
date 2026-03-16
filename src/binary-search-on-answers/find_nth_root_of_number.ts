// Problem Statement: Given two numbers N and M,
// find the Nth root of M. The nth root of a number M is defined
// as a number X when raised to the power N equals M.
// If the 'nth root is not an integer, return -1.
//
//
// Examples:
// Input: N = 3, M = 27
// Output: 3
// Explanation: The cube root of 27 is equal to 3.
// Input : N = 4, M = 69
// Output: -1
// Explanation : The 4th root of 69 does not exist. So, the answer is -1.

// Brute Force Appraoch
// Iterate through 1 to n while checking
// if each value multiplied n times results in that number
// If yes, return that or -1
// TC - O(m log n) => m for iterating from 1 to m and log n for finding exponential value n times
// SC - O(1)
function brute(n: number, m: number) {
  let ans: number = -1

  for (let i = 1; i < m; i++) {
    if (i ** n === m) ans = i
    else if (i ** n > m) break;
  }

  return ans;
}


// Optimal Appraoch
// Use binary search on answers
// TC - O(log m * log n)
// SC - O(1)
function optimal(n: number, m: number) {
  let low = 1, high = m - 1, mid, ans = -1;

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // Check if nth power of mid is equal to m
    // if it is return it.
    if (mid ** n === m) {
      ans = mid
      break;
    }

    // If nth power of mid exceeds m,
    // there can be an nth power to the left 
    // Eliminate the right search space
    else if (mid ** n > m) high = mid - 1

    // If the nth power of mid is smaller,
    // then there can be an answer to the right,
    // Eliminate the left search space
    else low = mid + 1
  }

  return ans
}

const res = optimal(4, 80)
console.log(res)
