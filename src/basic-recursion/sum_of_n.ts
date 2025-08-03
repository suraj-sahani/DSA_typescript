// Parameterized approach
// export function sum_of_n(i: number, n: number) {
//   if (i < 1) {
//     console.log(n);
//     return;
//   }

//   sum_of_n(i - 1, n + i);
// }

// const res = sum_of_n(5, 0);
// console.log(res);

// Functional Approach
export function sum_of_n(n: number): number {
  // base case
  if (n === 0) return 0;

  return n + sum_of_n(n - 1);
}

const res = sum_of_n(5);
console.log(res);
