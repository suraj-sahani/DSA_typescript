// Given a number n, print if it is a prime number or not.
// A prime number is a number that has only 2 factors, 1 and itself.

// Brute for approach
// Initialize a count to 0,
// Run a loop from 2 to n since 1 will always be divisible, and divide the number with each value of n
// if the count is more than 2, it is not prime

// export function isPrime(num: number) {
//   let count = 0;

//   for (let i = 1; i <= num; i++) {
//     if (num % i === 0) count++;
//   }

//   return count === 2;
// }

// Optimized approach
// All the factors of a number can be found in square root of n
// We use this approach

export function isPrime(num: number) {
  let count = 0;

  for (let i = 1; i * i <= num; i++) {
    if (num % i === 0) {
      // increase counter for 1st facotr
      count++;
      // increase counter for second facotr if its not the same as the first counter
      if (num % i !== i) count++;
    }
  }

  return count === 2;
}

const start = performance.now();
const ans = isPrime(2051);
const end = performance.now();
console.log(`Execution time: ${(end - start).toFixed(4)}ms`);
console.log(ans);
