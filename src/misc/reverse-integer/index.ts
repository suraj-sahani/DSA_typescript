// Gien an input number x, return the x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

// Navie approach
// Conver the number to a string
// Reverse the string
// Convet the string that has been reversed in number
// export const reverseInteger = (x: number): number => {
//   return +x.toString().split("").reverse().join("");
// };

export const reverseInteger = (x: number): number => {
  // Define 32-bit integer limits
  const MAX_INT = Math.pow(2, 31) - 1;
  const MIN_INT = -Math.pow(2, 31);

  let num = Math.abs(x);
  let res = 0;

  while (num > 0) {
    // Check for potential overflow before adding next digit
    if (
      res > Math.floor(MAX_INT / 10) ||
      (res === Math.floor(MAX_INT / 10) && num % 10 > MAX_INT % 10)
    ) {
      return 0;
    }

    let r = num % 10;
    res = res * 10 + r;
    num = Math.floor(num / 10);
  }

  // Handle negative numbers
  res = x < 0 ? -res : res;

  // Final range check
  if (res > MAX_INT || res < MIN_INT) {
    return 0;
  }

  return res;
};

const result = reverseInteger(123);
console.log(result);
