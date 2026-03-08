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
// TC - ~ O(n)
// SC - O(1)
function brute(n: number) {
  let sqrt = 1;
  for (let i = 1; i <= n; i++) {
    if (i * i <= n) sqrt = i;
    // If at any point the square value increase n, break out.
    else break
  }

  return sqrt
}

// Optimal Appraoch
// We build on the brute force approach.
// Since we were linearly iterating over number from
// 1, 2, 3,.....n, we can use binary search
// lets take an example of n = 28,
// The lowest possible square root is 1 and the highest can be 28
// We take low = 1, high = 28, finding mid = 14
// We find the square of mid = 14 * 14 = > 28
// Now, it is sure that any numbers after 14 will also not be the square root.
// Thus, we trim down out search space to low = 1, high = 13
// We keep repeating the steps where is square of mid exceeds n, we eliminate 
// the right half and if it is smaller than n, we eliminate the left half.
// There is also an observation where since we are eliminating the halves,
// When the binary search is over i.e high < low, the high will also store
// the possible answer.
// TC - O(log n)
// SC - O(1)
function optimal(n: number) {
  let low = 1, high = n, mid;

  let sqrt = 1;
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // If the square of mid is equal, then that is the answer
    // break out.
    if (mid * mid === n) {
      sqrt = mid
      break;
    }
    // If the square is less, there can be square to the right and it does not make sense to keep searching on the left,
    // thus we discard out left half and keep searching on the right
    else if (mid * mid < n) {
      sqrt = mid
      low = mid + 1
    }
    // If the square of mid is greater than n,
    // They definitely is no square root to the right
    // thus we discard the right half.
    else
      high = mid - 1
  }

  return sqrt
}
const res = optimal(25)
console.log(res)
