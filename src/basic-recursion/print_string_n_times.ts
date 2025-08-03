// Print something n times until a base case is reached
// T - O(n)
// S - O(n) - This is hypothetical/internal as recursion using the systems internal memory also known as the stack space.

export function print_n_times(i: number, n: number): void {
  if (i > n) return;
  console.log(`Printing for ${i}th time.`);
  i++;
  print_n_times(i, n);
}

print_n_times(1, 5);
