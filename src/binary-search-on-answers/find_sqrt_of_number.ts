// Problem Statement: You are given a positive integer n.
// Your task is to find and return its square root.
// If ‘n’ is not a perfect square, then return the floor value of sqrt(n).
//
// Input: N = 36
// Output: 6
// Explanation: Square root of 36 is 6. 
// Input: N = 28
// Output: 5
// Explanation: Square root of 28 is approximately 5.292. So, the floor value will be 5.

// Brute Force Appraoch
// Iterate from 1 to n while finding the square of each number for that iteration.
// If the square of the "i" th value is equal then return that,
// else return if it is not a perfect square, return the value of "i" before it
// TC - O(sqrt(n))
// SC - O(1)
function brute(n: number) {
  if (n === 2 || n === 1) return 1

  let sqrt = 1;
  for (let i = 1; i <= n; i++) {
    if (i * i <= n) sqrt = i;
    // If at any point the square value increase n, break out.
    else break
  }

  return sqrt
}

const res = brute(25)
console.log(res)
