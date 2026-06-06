/*
K-th Element of two sorted arrays

Problem Statement: Given two sorted arrays a and b of size m and n respectively. Find the kth element of the final sorted array.

Example 1:
Input:
a = [2, 3, 6, 7, 9], b = [1, 4, 8, 10], k = 5
Output: 6
Explanation:
The final sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element of this array is 6.

Example 2:
Input:
a = [100, 112, 256, 349, 770], b = [72, 86, 113, 119, 265, 445, 892], k = 7
Output: 256
Explanation:
The final sorted array is [72, 86, 100, 112, 113, 119, 256, 265, 349, 445, 770, 892]. The 7th element of this array is 256.
*/

/*
Brute Force Apporach
Merge the two arrays to get a sorted array and return the kth element
TC - O(n + m)
SC - O(n + m)
 */

function brute(arr1: number[], arr2: number[], k: number) {
  const n1 = arr1.length, n2 = arr2.length, ans: number[] = []

  let i = 0, j = 0;

  while (i < n1 && j < n2) {
    if (arr1[i]! < arr2[j]!) ans.push(arr1[i++]!)
    else ans.push(arr2[j++]!)
  }

  while (i < n1) ans.push(arr1[i++]!)
  while (j < n2) ans.push(arr2[j++]!)

  return ans[k - 1]!
}


/*
Better Apporach
We dont create a new array to store the merged elements,
rather we keep track of the indexes
We will iterate over the arrays while keeping track of the current element
and the count of elements we have encountered till then.
If at any point, the count matches the k, we return that element
TC - O(n + m)
SC - O(1)
*/

function better(arr1: number[], arr2: number[], k: number) {
  const n1 = arr1.length, n2 = arr2.length;

  if (k > n1 + n2) return -1

  let count = 0, i = 0, j = 0

  let el = -1;
  while (i < n1 && j < n2) {
    if (arr1[i]! < arr2[j]!)
      el = arr1[i++]!

    else
      el = arr2[j++]!


    count++
    if (count === k) return el
  }

  while (i < n1) {
    el = arr1[i++]!
    count++
    if (count === k) return el

  }

  while (j < n2) {
    el = arr2[j++]!
    count++
    if (count === k) return el

  }

  return el
}

const res = better([2, 3], [1, 4, 8, 9, 12], 5)
console.log(res)
