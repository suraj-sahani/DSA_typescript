// Given a nuber n, print from 1 to n using recursion
export function print_till_1(i: number, n: number): void {
  if (i < 1) return;
  console.log(`Printing iteration : ${i}`);
  i--;
  print_till_1(i, n);
}

print_till_1(10, 10);
