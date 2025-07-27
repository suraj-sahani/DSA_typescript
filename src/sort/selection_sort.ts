// Algorithm - Move the minimum element to the front
// Loop through the array from 1 to i < n - 1 since we are swapping two elements at a time
// Run another internal loop to find the minimum in the unsorted fportion,
// For this, loop from i to i <= n - 1
// Find the minimum element in the unsorted portion of the array
// Swap it with the first element of the unsorted array

// T - O(n^2)
// S - O(1)

export function selection_sort(nums: number[]) {
  const n = nums.length;

  for (let i = 0; i < n - 1; i++) {
    // Assuming the minimum element is at index i
    let min_element_index = i;

    // loop till the last element and update the index of the minimum element
    for (let j = i; j < n; j++) {
      if (nums[j]! < nums[min_element_index]!) min_element_index = j;
    }

    // Swap the ith element with the minimum element from the unsorted array
    const temp = nums[i]!;
    nums[i] = nums[min_element_index]!;
    nums[min_element_index] = temp;
  }

  return nums;
}

const start = performance.now();
const res = selection_sort([13, 46, 23, 52, 9]);
const end = performance.now();
console.log(`Execution time : ${(end - start).toFixed(4)}ms`);
console.log(res);
