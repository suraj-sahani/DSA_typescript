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

const res = brute(4, 81)
console.log(res)
