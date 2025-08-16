export function n_fibonacci(n: number): number {
  if (n <= 1) return n;

  return n_fibonacci(n - 1) + n_fibonacci(n - 2);
}

const start = performance.now();
const res = n_fibonacci(5);
const end = performance.now();
console.log(`Execution time: ${(end - start).toFixed(4)}ms`);
console.log(res);
