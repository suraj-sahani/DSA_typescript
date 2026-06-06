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
    if (i != n && j != m) {
      if (arr1[i]! > arr2[j]!) m1 = arr2[j++]!
      else m1 = arr1[i++]!
    }

    // if only arr1[] has remaining elements
    else if (i < n)
      m1 = arr1[i++]!;

    // if only arr2[] has remaining elements
    else
      m1 = arr2[j++]!;
  }

  if ((n + m) % 2 === 0) return (m1 + m2) / 2
  return m1
}

/*
Optimal Approach
Since the arrays are sorted, we can definitely use binary search.
But how? Traditionally we either remove the right or the left half
but for the binary search to work, we need a sorted array and we dont have
it in this case. Thus, we need to make one

For even number of total elements i.e n1 + n2 % 2 === 0
E.g
arr1 : [1,3,4,7,10,12], arr2 : [2,3,6,15]
The sorted merged array : [1,2,3,3,4,6,7,10,12,15]
If we draw a line a symmetry, at index 5, we can see that
1,2,3,3,4 | 6,7,10,12,15
Left half : 3 elements on from arr1, 2 elements from arr2
Right half: 3 elements from arr1 , 2 elements from arr 2
We will try to formulate the correct left half and the right half
If we do this, we can find the median.
How do we formulate the halves? let us pick combination of picking elements
for e.g Pick 0 from arr1 and Pick 4 from arr2 
Doing this,we can see that we cannot form a half as each half requires 5 elements
Pick 1 from arr1 and Pick 4 from arr2
Left half : arr1: 1, arr2: 2,3,6,15
For the right half now we pick the remaining 
Right half : 3,4,7,10,12
Now the merged array : 1,2,3,6,16 | 3,4,7,10,12
We can see that this array is not sorted correctly and thus is not a valid configuration
Thus, we keep doing this until we find a valid configuration
But how to determine if a configuration is valid.
We keep track of 4 variables:
For left half:
l1 : last element from arr1, l2: last element from arr2,
For right half:
r1: first element form arr1, r2: first element from arr2
Thus, if we take the valid configuration for the above arrays
We pick 3 from arr1 and 2 from arr2
Left half: arr1: 1,3,4, arr2: 2,3 => sorted left half: 1,2,3,3,4
Right half: arr1: 7,10,12, arr2: 6,15 => sorted right half : 6,7,10,12,15
Now if we observe carefully,
l1: 4, l2: 3, r1: 7, r2: 6
To check if a configuration is valid, l1 <= r2 and l2 <=r1
Now, how do we calculate the median,
We just take the greatest element from the left half and the smallest element
from the right half and divide them by 2.
Formula = ( max(l1,l2) + min(r1,r2) ) / 2

Now that we have out array, we learn how to apply binary search on this formulated array
We use the same l1,l2,r1,r2 values to eleminate halves
If l1 > r2, we cannot take the right hence high = mid - 1.
if l2 > r1, we cannot take the left half hence low = mid + 1
We need to keep in mind that we are eleminting based on the symmetry
Thus, if we take 4 elements from arr1 and 1 element from arr2
and l1 > r2, taking more elements from arr1 will not give us a better result
as if we increase the number of elements take from arr1, l1 will keep increasing
Same thing goes for the second half i.e if we take 2 element from arr1 
and 3 from arr2 and the l2 > r1, we will not get a better result by taking
more elements as taking more would increase the value of l2.

Another observation/optimization is that when we applying binary search
on array of length n, the TC : O(log n) and since we have 2 arrays
we can optimize this by applying the binary search on a smaller array

Since we are applying binary search on symmetry, 
low = 0, high = n -1; where n is the length of the shorter array.
We keep track of two mids: mid1 : Number of elements from arr1
mid2: Number of elements from arr2.
Now, we just find mid1 and the value of mid2 = total length of the half - mid1
Another point to keep in mind is that if we are taking all elements from 
an array, we might not either l1,l2,r1,r2. In those cases, for comparison
We take INT_MIN
So, when we find a valid configuration, we can formulate that
l1: arr1[mid1 - 1], l2 = arr2[mid2 - 1], r1 = arr1[mid1], r2 = arr2[mid2]

For odd number of total elements, the only modification that we need to do,
is that we either take an odd symmetry on the left or the right
therefore the line of symmetry will be (n1 + n2 + 1 ) / 2
The formula for median will also change,
Formula  = max(l1,l2) / 2 => if we choose median on the left
Formula = max(r1,r2) / 2
*/
function optimal(arr1: number[], arr2: number[]): number {
  const n1 = arr1.length;
  const n2 = arr2.length;

  // Ensure binary search is performed on the smaller array for O(log(min(n1, n2)))
  if (n1 > n2) return optimal(arr2, arr1);

  let low = 0;
  let high = n1;
  const totalLength = n1 + n2;
  const requiredLeft = Math.floor((n1 + n2 + 1) / 2);

  while (low <= high) {
    let mid1 = low + Math.floor((high - low) / 2);
    let mid2 = requiredLeft - mid1;

    // Determine values at the partition boundaries
    // If mid1/mid2 is at 0, there is no element on the left (use -Infinity)
    // If mid1/mid2 is at n1/n2, there is no element on the right (use Infinity)
    let l1 = mid1 === 0 ? -Infinity : arr1[mid1 - 1]!;
    let l2 = mid2 === 0 ? -Infinity : arr2[mid2 - 1]!;
    let r1 = mid1 === n1 ? Infinity : arr1[mid1]!;
    let r2 = mid2 === n2 ? Infinity : arr2[mid2]!;

    // Check if the current partition is valid
    if (l1 <= r2 && l2 <= r1) {
      // Logic for Odd total length
      if (totalLength % 2 !== 0) {
        return Math.max(l1, l2);
      }
      // Logic for Even total length
      else {
        return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
      }
    }

    // Binary search adjustment
    if (l1 > r2) {
      // Too many elements from arr1 on the left side, move left
      high = mid1 - 1;
    } else {
      // Too few elements from arr1 on the left side, move right
      low = mid1 + 1;
    }
  }

  return 0;
} const res = optimal([1, 4, 5], [3, 5]) // 1,3,4,5,5
console.log(res)
