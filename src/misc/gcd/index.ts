// Given two numbers, find the greatest common divisor of the two numbers

// Brute force approach
// Run a loop from 1 to min(n1,n2) since if the value of i increase the smallest number, theres no point in runing the loop any more
// If i in divisible by both n1 and n2, update the gcd
// export function gcd(num1: number, num2: number) {
//   let ans = 1;

//   for (let i = 0; i <= Math.min(num1, num2); i++) {
//     if (num1 % i === 0 && num2 % i === 0) ans = i;
//   }

//   return ans;
// }

// Optimized Approach
// Euclidean Algorithm
// It states that gcd(a,b) = gcd(a - b,b) where a > b
// or
// gcd(a,b) = gcd(a % b, b), where a > b
// repeat until one of them is zero
// if any one of them is zero, the other one is the gcd
// T - O(log v min(a,b)) where v is base of log and it is continuously changing due to the modulo operation
export function gcd(num1: number, num2: number) {
  while (num1 > 0 && num2 > 0) {
    if (num1 > num2) num1 = num1 % num2;
    else num2 = num2 % num1;
  }

  return num1 === 0 ? num2 : num1;
}

const start = performance.now();
const res = gcd(12, 15);
const end = performance.now();
console.log(`Execution time: ${(end - start).toFixed(4)}ms`);
console.log(res);
