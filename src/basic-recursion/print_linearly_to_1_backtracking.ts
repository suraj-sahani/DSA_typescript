// Print from n to i but the decrement operation is not allowed
// i.e, fn(i-1,n) is not permisable

export function print_till_1_backtrack(i: number, n: number): void {
  if (i > n) return;

  // In backtracing approach, we stop the execution of the program
  // until base case is meant and thus
  // Hence instead of running from n to 1
  // we run from 1 to n but dont execute the required method i.e print the ith iteration
  print_till_1_backtrack(i + 1, n);

  console.log(`Printing ${i}`);
}

print_till_1_backtrack(1, 5);
