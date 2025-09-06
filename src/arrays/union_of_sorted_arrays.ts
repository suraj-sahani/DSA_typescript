// Given two sorted arrays, return the union of two arrays
// Example 1:
// arr1 : [1,1,2,4,5], arr2: [1,2,3,3,5,6]
// res : [1,2,3,4,5,6]

// Brute force approach
// Create a set and insert elements in it
// The resulting set will contain only unique elements
// return an array containing these elements
// TC - O(n1) + O(n2) + O(d) or O(n1 + n2) => if both arrays have unique elements ; d is the number of unique elements
// SC - O(d) + O(d) = O(2d) , one for the set and one for the resultant array
export function union_of_sorted_arrays_brute(arr1: number[], arr2: number[]) {
  const n1 = arr1.length,
    n2 = arr2.length;
  const st = new Set();

  for (let i = 0; i < n1; i++) {
    if (!st.has(arr1[i])) st.add(arr1[i]!);
  }

  for (let i = 0; i < n2; i++) {
    if (!st.has(arr2[i])) st.add(arr2[i]!);
  }

  const res = [];

  for (const item of st) res.push(item);

  return res;
}

export function union_of_sorted_arrays_optimal(arr1: number[], arr2: number[]) {
  const n1 = arr1.length,
    n2 = arr2.length,
    res: number[] = [];

  let i = 0,
    j = 0;

  while (i < n1 && j < n2) {
    // Check if the item from the first array is less than equal
    // the item from the second index
    if (arr1[i]! <= arr2[j]!) {
      // Check if the last item in the resulting array is less than equal
      // to arr1[i]
      // if its not, push it in the array
      // increae the i pointer
      if (arr1[i] !== res[res.length - 1]!) {
        res.push(arr1[i]!);
      }
      // We increae this pointer irrespectively since,
      // If we take it we will have to increase the pointer by default
      // if we dont, that means its already in the array and we
      // need to move forwards anyway
      i++;
    } else {
      // If the element of arr1 is greater
      // we need to take the smaller element i.e the element of arr2
      // Check if this is also not in the resultant

      if (arr2[j] !== res[res.length - 1]) res.push(arr2[j]!);
      // If the array is already in the resulting array or
      // It is same, we increase the pointer
      j++;
    }
  }

  // Edge case
  // If the indexing of second array is over
  // Loop through the remaining elements in the first array and insert
  // if they are already not present
  while (i < n1) {
    if (arr1[i] !== res[res.length - 1]!) res.push(arr1[i]!);
    i++;
  }

  // Edge case
  // If the indexing of first array is over
  // Loop through the remaining elements in the second array and insert
  // if they are already not present
  while (j < n2) {
    if (arr2[j] !== res[res.length - 1]) res.push(arr2[j]!);
    j++;
  }

  return res;
}

const res = union_of_sorted_arrays_optimal([6, 7, 7, 8], [1, 2, 3, 3, 5, 6]);

console.log(res);
