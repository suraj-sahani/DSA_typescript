/**
 * Swap two elements in an array.
 * @param arr The array in which to swap elements.
 * @param fIndex The index of the first element to swap.
 * @param eIndex The index of the second element to swap.
 */
export function swap<T>(arr: T[], fIndex: number, eIndex: number) {
  if (!arr[fIndex]) throw new Error("Invalid First Index")

  const temp = arr[fIndex]

  if (!arr[eIndex]) throw new Error("Invalid End Index")

  arr[fIndex] = arr[eIndex]

  arr[eIndex] = temp
}

/**
 * Generates all possible permutations of an array.
 *
 * @param arr The input array for which to generate permutations.
 * @returns A 2D array where each inner array is a unique permutation.
 */
export function generatePermutations<T>(arr: T[]): T[][] {
  const result: T[][] = [];

  function backtrack(currentPermutation: T[], remainingElements: T[]) {
    // Base case: If there are no remaining elements, we've formed a complete
    // permutation. Add a copy to the result.
    if (remainingElements.length === 0) {
      result.push([...currentPermutation]);
      return;
    }

    // Recursive step: Iterate through the remaining elements.
    for (let i = 0; i < remainingElements.length; i++) {
      const element = remainingElements[i];

      if (!element) throw new Error(`No element found at index ${i}`)

      // 1. Choose an element: Add it to the current permutation.
      currentPermutation.push(element);

      // 2. Explore: Create a new array of remaining elements by removing the
      //    chosen one.
      const newRemainingElements = remainingElements.filter(
        (_, index) => index !== i,
      );

      // 3. Recurse: Call backtrack with the updated current permutation and
      //    remaining elements.
      backtrack(currentPermutation, newRemainingElements);

      // 4. Unchoose/Backtrack: Remove the element from the current permutation
      //    to explore other possibilities.
      currentPermutation.pop();
    }
  }

  // Start the backtracking process with an empty current permutation and
  // the full input array as remaining elements.
  backtrack([], arr);

  return result;
}
