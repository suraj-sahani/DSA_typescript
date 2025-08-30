// Given an array of intergers, find the second largest element in the array.
// Brute force approach
// Sort the array and return the second last element.
// This approach will not work if there are duplicates.
// Thus we sort the array
// Loop through the sorted array to find the second largest

// export function second_largest_element(arr: number[]) {
//   const sorted_array = arr.sort((a, b) => a - b),
//     n = sorted_array.length;
//   let largest = sorted_array[n - 1]!,
//     sl = 0;

//   for (let i = n - 1 ; i >= 0 n; i--) {
//     if ( sorted_array[i]! !== largest)
//       sl = sorted_array[i]!;
//        break;
//   }

//   return sl;
// }

// Better / Optimal Solution
// Store two values, largest and second largest
// Loop through the array and check on every iteration if the current item
// Is larger than the largest value till now, updates the largest.
// At the same time check if the current item is greater than the second largest and not equal to the largest
// Update the second largest
export function second_largest_element(arr: number[]) {
  let sl = arr[0]!,
    l = arr[0]!;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]! > l) l = arr[i]!;
    if (arr[i]! > sl && arr[i] !== l) sl = arr[i]!;
  }

  return sl;
}

const start = performance.now();
const res = second_largest_element([0, 4, 1, 8, 2, 7]);
const end = performance.now();
console.log(`Execution Time: ${(end - start).toFixed(4)}ms`, res);
