// 88. Merge Sorted Array
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
//
// Merge nums1 and nums2 into a single array sorted in non-decreasing order.
//
// The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
//
// Example 1:
//
// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
// The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
// Example 2:
//
// Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
// Explanation: The arrays we are merging are [1] and [].
// The result of the merge is [1].
// Example 3:
//
// Input: nums1 = [0], m = 0, nums2 = [1], n = 1
// Output: [1]
// Explanation: The arrays we are merging are [] and [1].
// The result of the merge is [1].
// Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
//
//
// Constraints:
//
// nums1.length == m + n
// nums2.length == n
// 0 <= m, n <= 200
// 1 <= m + n <= 200
// -10^9 <= nums1[i], nums2[j] <= 10^9

import { swap } from "../utils"


// Brute Force Approach
// Loop through both arrays and add the smaller element in 
// An answer array
// TC - O( m + n )
// SC - O( m + n )
function brute(nums1: number[], nums2: number[]) {
  const n1 = nums1.length, n2 = nums2.length
  let left = 0, right = 0, idx = 0
  const nums = []

  while (left < n1 && right < n2) {
    if (nums1[left]! <= nums2[right]!) {
      nums[idx] = nums1[left]
      idx++, left++
    } else {
      nums[idx] = nums2[right]
      idx++, right++
    }
  }

  // If the left array has remaining elements,
  // add them
  while (left < n1) {
    nums[idx] = nums1[left]
    idx++, left++
  }

  // If the rigth array has remaining elements,
  // add them
  while (right < n2) {
    nums[idx] = nums2[right]
    idx++, right++
  }


  for (let i = 0; i < nums.length; i++) {
    // Modify the first array till all its size
    if (i < n1) {
      nums1[i] = nums[i]!
    }
    // Modify the second array
    else {
      nums2[i - n1] = nums[i]!
    }
  }

  console.log({ nums1, nums2 })
}

// Optimal Approach 1
// Since we know that we need to merge both arrays
// All the smaller elements will be in the first array
// and all the larger elements will be in the second array
// So, we loop from the end for the first array 
// and from the first for the second array
//  Checking each time if the current elements are in their correct position
//  If they are not swap them in-place
//  TC - O( min( m , n ) ) + O(n lon n) + O(m long m); 
//  O( min( m , n )) ;this is becuase if at any time, the indexing exceeds, the loop terminates,
//  O(n log n ), O(m long m) for sorting at the end
// SC - O(1)
function optimal1(nums1: number[], nums2: number[]) {
  const n1 = nums1.length, n2 = nums2.length
  let left = n1 - 1, right = 0

  while (left >= 0 && right < n2 - 1) {
    // Last element of the first array is greater than the 
    // first element of the second array, then
    // the last element of the first array should be in-place 
    // of the 1st element of the second array
    if (nums1[left]! > nums2[right]!) {
      const temp = nums1[left]!
      nums1[left] = nums2[right]!
      nums2[right] = temp
      left--
      right++
    }
    // If at any moment, the element of the first array is smaller than
    // the current element of the second array, we don't need to iterate any more
    // As, the arrays are sorted, the element from this iteration will be at the correct place
    else break;
  }

  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)

  console.log({ nums1, nums2 })

}

// Optimal Approach 2
// Using "Gap" method derived for the sorting technique "Shell Sort"
// Add up the sizes of both arrays, take the ceil of the average of sizes of both arrays
// E.g. : n = 4, m = 5, gap = Math.ceil( (n + m) / 2) => 9 / 2 = 5
// Thus, we take the value of gap = 5
// Take two pointers where left = 0, and right = left + gap => right = 5
// Start iterating while checking the left is smaller than right
// If they are, increase left and right. Since right is ahead of left,
// Else swap into correct positions
// It will surely go our of bounds. When if does, we update the value of gap 
// By halving the gap and taking the ceil value,
// Therefore, gap = Math.ceil( gap / 2) => Math.ceil(5 / 2) = 3
// We continue the ierating again with left = 0, right = left + gap => right = 3
// TC - O( log (n + m) ) + O( m + n)
// O(log (m + n)) => For the oter "gap" loop as it is halving every iteration
// O(m + n) => checking elements and swapping

function swapIfGreater(arr1: number[], arr2: number[], left: number, right: number) {
  if (arr1[left]! > arr2[right]!) {
    const temp = arr1[left]!
    arr1[left] = arr2[right]!
    arr2[right] = temp
  }
}



function optimal2(nums1: number[], nums2: number[]) {
  const n = nums1.length, m = nums2.length
  const len = m + n
  let gap = Math.ceil((len) / 2)
  while (gap > 0) {
    let left = 0, right = left + gap
    // We dont need to check for the left in the while loop
    // As right will always cross the bounds first
    while (right < len) {
      // Check if we arr both in array 1 and array 2
      if (left < n && right >= n) {
        // Since left and right represent different arrays,
        // We cannot directly use right as index. Why?
        // E.g arr1 = [1,3,5,7], arr2 = [0,2,6,8,9], left = 0, right = 5
        // For first iteration, we get arr[left = 0] = 1, arr[right = 5] = 9, instead, we should be checking with
        // arr1[0] and arr2[0], thus to check the correct element for the second array,
        //  we check with arr2[right - n(length of first array)]
        swapIfGreater(nums1, nums2, left, right - n)
      }
      // Check if both are in the second array
      // Note that we are not checking not right
      // This is due to the fact that right is always gap steps ahead of left
      // Thus, if left is in the right i.e greater than equal to n
      // then right will also be greater than n 
      // We only subtract with n where we are referring to arr2 as that is where the indexing
      // needs to corrected with arr1
      else if (left > n) {
        swapIfGreater(nums2, nums2, left - n, right - n)
      }
      // Both are in first array
      // we dont subtract here as both are in the first array 
      else {
        swapIfGreater(nums1, nums1, left, right)
      }
      left++
      right++

    }

    // Edge case, if at any point, we get gap with a value of 1 
    // It means we done and we need to break out, otherwise in the next step,
    // gap will again be calculated as 1 and thus it will go in an infinite loop
    if (gap === 1) break
    gap = Math.ceil(gap / 2)

  }

  console.log({ nums1, nums2 })
}


const res = optimal2([1, 3, 5, 7], [0, 2, 6, 8, 9])
