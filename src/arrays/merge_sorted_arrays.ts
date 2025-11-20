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

const res = brute([1, 3, 5, 7], [0, 2, 6, 8, 9])
