// Print from 1 to n but we are not allowed to increment the first operator
// thus, fn(i+1,n) is not allowed

export function print_to_n_backtrack(i: number, n: number): void {
  if (i < 1) return;

  // In backtracing approach, we stop the execution of the program
  // until base case is meant and thus
  // Hence instead of running from 1 to n
  // we run from n to 1 but dont execute the required method i.e print the ith iteration
  print_to_n_backtrack(i - 1, n);

  console.log(`Printing ${i}`);
}

print_to_n_backtrack(5, 5);
