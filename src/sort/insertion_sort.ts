// Basic idea - Take an element and and check with the element before it
// If is larger than the previous element, swap it.
// Loop till n - 1
// For each iteration, run another till before the 0th since we are comparing
// with its previous element and don't want to go out of range
// swap it until possible
// Continue until swapping is not
// T - O(n^2)
// S - O(1)

export function insertion_sort(nums: number[]): number[] {
  const n = nums.length;

  for (let i = 0; i <= n - 1; i++) {
    let j = i;
    // Check if previous element it larger and swap until it reaches it correct position i.e it cannot be swapped
    while (j > 0 && nums[j]! < nums[j - 1]!) {
      const temp = nums[j]!;
      nums[j] = nums[j - 1]!;
      nums[j - 1] = temp;
      j--;
    }
  }
  return nums;
}

const start = performance.now();
const res = insertion_sort([64, 34, 25, 12, 90, 45, 78, 3, 59, 17]);
const end = performance.now();
console.log(`Execution time: ${(end - start).toFixed(4)}ms`);
console.log(res);
