// Algorithm - Move the largest element to the end
// Run a nestd loop in which the first loop iternates till n - 2 since we compare i with i+1
// The second loop check the current and next element and runs till n - 1 - i
// We loop till n - 1 - i because for every iteration of i, the last i elements becomes sorted.
// Thus, we dont need to check the last i items.

export function bubble_sort(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j]! > nums[j + 1]!) {
        const temp = nums[j]!;
        nums[j] = nums[j + 1]!;
        nums[j + 1] = temp;
      }
    }
  }
}

const arr = [64, 34, 25, 12, 22, 11, 90];
bubble_sort(arr);
console.log(arr);
