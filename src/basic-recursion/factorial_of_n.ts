export function factorial_of_n(n: number): number {
  if (n === 1) return 1;

  return n * factorial_of_n(n - 1);
}

const res = factorial_of_n(5);
console.log(res);
