// Given a nuber n, print from 1 to n using recursion
export function print_till_n(i: number, n: number): void {
  if (i > n) return;
  console.log(`Printing iteration : ${i}`);
  i++;
  print_till_n(i, n);
}

print_till_n(1, 10);
