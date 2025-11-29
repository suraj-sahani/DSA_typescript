// 493. Reverse Pairs
// Hard
//
// Given an integer array nums, return the number of reverse pairs in the array.
//
// A reverse pair is a pair (i, j) where:
//
// 0 <= i < j < nums.length and
// nums[i] > 2 * nums[j].
//
//
//
// Example 1:
//
// Input: nums = [1,3,2,3,1]
// Output: 2
// Explanation: The reverse pairs are:
// (1, 4) --> nums[1] = 3, nums[4] = 1, 3 > 2 * 1
// (3, 4) --> nums[3] = 3, nums[4] = 1, 3 > 2 * 1
//
// Example 2:
//
// Input: nums = [2,4,3,5,1]
// Output: 3
// Explanation: The reverse pairs are:
// (1, 4) --> nums[1] = 4, nums[4] = 1, 4 > 2 * 1
// (2, 4) --> nums[2] = 3, nums[4] = 1, 3 > 2 * 1
// (3, 4) --> nums[3] = 5, nums[4] = 1, 5 > 2 * 1
//
//
//
// Constraints:
// 1 <= nums.length <= 5 * 10^4
// -2^31 <= nums[i] <= 2^31 - 1


// Brute Force Approach
// Run a nested loop and check if the 
// current_element > that 2 * next_element
// TC - O(n^2)
// SC - O(1)
function brute(nums: number[]) {
  const n = nums.length

  let count = 0

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i]! > (2 * nums[j]!)) count++
    }
  }

  return count
}


// Optimal Approach
// We will follow the same approach of merge sort,
// but with a minor change.
// E.g. first_half = [6,13,21,25], second_half = [1,2,3,4,4,4,9,11,13]
// In the "Count Inversions" problem we took an element from the first_half
// and another element from the second_half
// We would check that if the element from the first_half < element from second_half half,
// We would assum that all other elements in the frist_half would make pairs with that element 
// on the second_half. Thus, instead of checking for all elemetns we increasing the count by 1
// for each iteration we would increase it by the count of all elements in the first_half
// It is not true for this question.
// E.g take 6 from first_half, thake possible pairs will be with 1,2 and with 3
// Thus, we would have omitted the rest of the elements in the first_half
// But, we can clearly see that 13,21,25 will be able to make pairs with 3
// Thus, we would have missed out a lot of pairs
// 
// Observation:
// 6 can make pairs with : [1,2]
// 13 can make pairs with: [1, 2, 3, 4, 4, 4]
// 21 can make pairs with: [1, 2, 3, 4, 4, 4, 9]
// We can see that each number also contains numbers that made pairs with the previous number as well.
// We wil use this pattern to solve it.
// Thus, just before merging, we will have to do any extra step to check find the count
// TC - log n * (n + n) => 2n log n
// log n => Splitting into halves
// n => merging the split arrays
// n => counting pairs ; this might look as n^2 but we make an optimization where,
// Instead of checking for all elements, we just add the pairs foormed by the previous number
// SC - O(n) => Merge
function merge_sort(nums: number[], low: number, high: number) {
  let count = 0

  if (low >= high) return count
  const mid = Math.floor((low + high) / 2)
  count += merge_sort(nums, low, mid)
  count += merge_sort(nums, mid + 1, high)
  count += countPairs(nums, low, mid, high)
  merge_arrays(nums, low, mid, high)

  return count
}

function merge_arrays(nums: number[], low: number, mid: number, high: number) {
  let left = low, right = mid + 1
  const temp: number[] = []
  while (left <= mid && right <= high) {
    if (nums[left]! <= nums[right]!) {
      temp.push(nums[left]!)
      left++
    } else {
      temp.push(nums[right]!)
      right++
    }
  }

  // Add remaining elements 
  while (left <= mid) {
    temp.push(nums[left]!)
    left++
  }

  while (right <= high) {
    temp.push(nums[right]!)
    right++
  }

  for (let i = low; i <= high; i++) {
    nums[i] = temp[i - low]!
  }

}

function countPairs(nums: number[], low: number, mid: number, high: number) {
  let count = 0, right = mid + 1
  for (let i = low; i <= mid; i++) {
    while (right <= high && nums[i]! > (2 * nums[right]!))
      right++

    count += (right - (mid + 1))
  }

  return count
}

function optimal(nums: number[]) {
  const n = nums.length
  return merge_sort(nums, 0, n - 1)
}

const res = optimal([2, 4, 3, 5, 1])
console.log(res)
