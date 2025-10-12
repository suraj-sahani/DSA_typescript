/**
 * Swap two elements in an array.
 * @param arr The array in which to swap elements.
 * @param fIndex The index of the first element to swap.
 * @param eIndex The index of the second element to swap.
 */
export function swap<T>(arr: T[], fIndex: number, eIndex: number) {
  if (arr[fIndex] === 'undefined') throw new Error("Invalid First Index")

  const temp = arr[fIndex]!

  if (arr[eIndex] === 'undefined') throw new Error("Invalid End Index")

  arr[fIndex] = arr[eIndex]!

  arr[eIndex] = temp
}

/**
 * Generates all possible permutations of an array, returned in lexicographical order.
 *
 * @param arr The input array for which to generate permutations.
 * @returns A 2D array where each inner array is a unique permutation,
 *          sorted lexicographically.
 */
export function generatePermutations<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  // Important: Create a sorted copy of the input array to ensure
  // permutations are generated in lexicographical order.
  // This assumes elements of type T are comparable (e.g., numbers, strings).
  const sortedArr = [...arr].sort(); // Use default sort for comparable types

  function backtrack(currentPermutation: T[], remainingElements: T[]) {
    if (remainingElements.length === 0) {
      result.push([...currentPermutation]);
      return;
    }

    for (let i = 0; i < remainingElements.length; i++) {
      const element = remainingElements[i];

      // Skip duplicates if the array might contain them and you only want
      // unique permutations when considering the values, not their original positions.
      // This is for permutations of arrays with repeating elements.
      // For arrays with unique elements, this isn't strictly necessary but harmless.
      if (i > 0 && remainingElements[i] === remainingElements[i - 1]) {
        continue;
      }

      if (element === undefined) continue; // TypeScript type guard

      currentPermutation.push(element);
      const newRemainingElements = remainingElements.filter(
        (_, index) => index !== i,
      );
      backtrack(currentPermutation, newRemainingElements);
      currentPermutation.pop();
    }
  }

  backtrack([], sortedArr); // Start with the sorted array

  return result;
}
