// Given a number namespace, print all its divisors
// Brute force approach
// Run a loop from 1 to n and check if dividing the number result in 0 as remainder.
// if it does, print it.
// T - O(n)
// S - O(n)

// function printDivisors(num: number) {
//   let res: number[] = [];

//   for (let i = 1; i <= num; i++) {
//     if (num % i === 0) res.push(i);
//   }

//   return res;
// }

//  Optimized Approach
// For Eg: n = 36
// Factors are as follows
// 1 * 36 = 36
// 2 * 18 = 36
// 3 * 12 = 36
// 4 * 9 = 36
// 6 * 6 = 36
// 9 * 4 = 36
// 12 * 3 = 36
// 18 * 2 = 36
// 36 * 1 = 36

// We can observe that after a certain point, the divisors are just reverse orders of the predecesors
// And that certain point, from observation is square root of n
// Thus, we can optimize by looping till square root of n

// Another optimization we can do is instead of calling the Math.sqrt function,
// Check if i * i <= n
// Proof :
// For n = 1800(Using Math.sqrt(1800)), Execution time: 1.7653ms.
// Suing i * i <= num, Execution time: 0.0803ms

function printDivisors(num: number) {
  let res: number[] = [];

  for (let i = 1; i * i <= num; i++) {
    if (num % i === 0) {
      let first_factor = i;
      let second_factor = num / i;
      if (!res.includes(first_factor)) res.push(first_factor);
      if (first_factor !== second_factor) res.push(second_factor);
    }
  }

  return res.sort((a, b) => a - b);
}

const start = performance.now();
const ans = printDivisors(1800);
const end = performance.now();
console.log(`Execution time: ${(end - start).toFixed(4)}ms`);
console.log(ans);
