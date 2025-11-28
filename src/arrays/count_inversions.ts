// Problem Statement: Given an array of N integers,
// count the inversion of the array (using merge-sort).
//
// Inversion of an array: for all i & j < size of array,
// if i < j then you have to find pair (A[i],A[j]) such that A[j] < A[i].

// Brute Force Approach
// Run a nested loop to generate pairs
// Increase count if nums[i] > nums[j]
// TC - O(n^2)
// SC - O(1)
function brute(nums: number[]) {
  const n = nums.length
  let count = 0

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i]! > nums[j]!) {
        count++
      }
    }
  }

  return count
}

// Optimal Approach
// Intuition:
// Lets take two sorted arrays: [2,3,5,6] and [2,2,4,4,8]
// We take two pointer each pointing to the first of each array
// and compare. While comparing instead of increasing the count by 1,
// We can observer something. For i = 1,j = 1 , nums1[1] = 3, nums2[1] = 2
// Since both the arrays are sorted, if nums1[i] > nums2[j], we can say that all other
// elements after nums1[i] will also be able to form pairs with nums2[j]
// since the arrays are sorted, all elemetns after nums1[i] will also be greater.
// Thus, instead of increasing the count by 1 we increase the count by (n - i)
// To follow this approach, we use "Merge Sort" as it breaks down array in halves
// sorts them and merges them. We will check if nums1[i] > nums2[j] while merging and 
// increase the count accordingly
function optimal(nums: number[]) {
  const n = nums.length
  const sol = merge_sort(nums, 0, n - 1)
  return sol
}


function merge_sort(nums: number[], low: number, high: number) {
  let fCount = 0
  // Base case,
  if (low >= high) return fCount

  let mid = Math.floor((low + high) / 2)

  fCount += merge_sort(nums, low, mid)
  fCount += merge_sort(nums, mid + 1, high)
  fCount += merge(nums, low, mid, high)

  return fCount
}

function merge(nums: number[], low: number, mid: number, high: number) {
  const temp: number[] = []
  let left = low
  let right = mid + 1
  let count = 0
  while (left <= mid && right <= high) {
    if (nums[left]! <= nums[right]!) {
      temp.push(nums[left]!)
      left++
    } else {
      // If nums[left] is greater than nums[right]
      count += (mid - left + 1)
      temp.push(nums[right]!)
      right++
    }
  }

  // Push any remaining numbers in the first half
  while (left <= mid) {
    temp.push(nums[left]!)
    left++
  }

  // Push any remaining numbers in the second half
  while (right <= high) {
    temp.push(nums[right]!)
    right++
  }


  // Replace the original array with this sorted array
  for (let i = low; i <= high; i++) {
    nums[i] = temp[i - low]!
  }

  return count
}

const res = optimal([5, 3, 2, 4, 1])
console.log(res)
