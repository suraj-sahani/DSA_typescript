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

/*
Optimal Apporach
Since both the arrays are sorted, we can use binary search.
We will use the same approach as median of sorted arrays
TC - O(min(log m, log n))
SC - O(1)
*/
function optimal(arr1: number[], arr2: number[], k: number) {
  const n1 = arr1.length, n2 = arr2.length;

  if (n1 > n2) return optimal(arr2, arr1, k)

  // Why are we not taking low = 0 and high = n1
  // When we take low = 0, we are saying that we will not take any elements from arr1
  // When we take high = n1, we are saying that we will take everything from arr2
  // Since we are always considering the smaller array,
  // and n1 = 6 for example, it does not make sense take all elements from arr1,
  // as the merged array should contain elements from arr1 as well as arr2 or at max 
  // k elements from either of the arrays
  // thus we pick at max k elements from arr1.
  // Thus, out high will be min(k,n1)
  // Now, for low, smaller values will not make a difference
  // but for large values of k, 
  // e.g k = 7, arr = 6 elements, arr2 = 5 elements and total length = 11
  // if we take 7 from the left and remaing 4 from the right to form the symmetry
  // Event if we pick all elements from arr2(i.e. 5 elements) we still need a minimum
  // of 2 elements from the arr1
  let low = Math.max(k - n2, 0), high = Math.min(k, n1);
  // We follow the same approach here but instead to taking the total length,
  // we restrict it to k as we need the kth element
  const requiredLeft = k
  while (low <= high) {
    let mid1 = low + Math.floor((high - low) / 2)
    let mid2 = requiredLeft - mid1

    let l1 = mid1 === 0 ? Number.MIN_SAFE_INTEGER : arr1[mid1 - 1]!
    let l2 = mid2 === 0 ? Number.MIN_SAFE_INTEGER : arr2[mid2 - 1]!
    let r1 = mid1 === n1 ? Number.MAX_SAFE_INTEGER : arr1[mid1]!
    let r2 = mid2 === n2 ? Number.MAX_SAFE_INTEGER : arr2[mid2]!

    if (l1 <= r2 && l2 <= r1) {
      return Math.max(l1, l2)
    }

    else if (l1 > r2) high = mid1 - 1;
    else low = mid1 + 1

  }

  return -1
}

const res = optimal([2, 3], [1, 4, 8, 9, 12], 5)
console.log(res)
