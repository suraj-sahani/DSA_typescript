/* Median of Two Sorted Arrays
Hard
Topics
premium lock icon
Companies
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6
*/

// Brute Force Approach:
// Merge both arrays and then calculate/return the median
// TC - O(m + n)
// SC - O(m + n)
function brute(arr1: number[], arr2: number[]) {
  const n = arr1.length, m = arr2.length, merged: number[] = []

  let i = 0, j = 0;

  while (i < n && j < m) {
    if (arr1[i]! < arr2[j]!) {
      merged.push(arr1[i]!)
      i++
    }
    else {
      merged.push(arr2[j]!)
      j++
    }
  }

  while (i < n) {
    merged.push(arr1[i]!)
    i++
  }

  while (j < m) {
    merged.push(arr2[j]!)
    j++
  }

  const mergedLength = merged.length
  // If the mergedLength is even, the median will be between,
  // n/2 and n/2 - 1 element
  if (mergedLength % 2 === 0) {
    return (merged[mergedLength / 2]! + merged[mergedLength / 2 - 1]!) / 2
  }

  return merged[Math.floor(mergedLength / 2)]!
}


// Better Approach
// We dont really need to keep the merged array. If we can get,
// the index for elements, we cant use the indexes to calculate the median
// TC - O(m + n)
// SC - O(1)
function better(arr1: number[], arr2: number[]) {
  const n = arr1.length, m = arr2.length;

  let m1 = -1, m2 = -1, i = 0, j = 0;
  for (let count = 0; count <= (m + n) / 2; count++) {
    m2 = m1;

    // if both the arrays have remaining elements
    if (i != n && j != m)
      m1 = (arr1[i]! > arr2[j]!) ? arr2[j++]! : arr1[i++]!;

    // if only arr1[] has remaining elements
    else if (i < n)
      m1 = arr1[i++]!;

    // if only arr2[] has remaining elements
    else
      m1 = arr2[j++]!;
  }

  if ((n + m) % 2 === 0) return (m1 + m2) / 2
  return m2
}

const res = better([1, 4, 5], [3, 5])
console.log(res)
