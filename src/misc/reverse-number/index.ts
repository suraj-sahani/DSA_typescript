// 7. Reverse Integer

// Medium
// Topics
// premium lock iconCompanies

// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

// Example 1:

// Input: x = 123
// Output: 321

// Example 2:

// Input: x = -123
// Output: -321

// Example 3:

// Input: x = 120
// Output: 21

// Constraints: -231 <= x <= 231 - 1

function reverseNum(num: number) {
  let res = 0,
    absVal = Math.abs(num);
  const isNegative = num < 0;
  while (absVal > 0) {
    const r = absVal % 10;
    res = res * 10 + r;
    absVal = Math.floor(absVal / 10);
  }
  return isNegative ? -1 * res : res;
}

const ans = reverseNum(-210);
console.log(ans);
