// 2149. Rearrange Array Elements by Sign
// You are given a 0-indexed integer array nums of even length consisting of an equal number of positive and negative integers.
//
// You should return the array of nums such that the the array follows the given conditions:
//
// Every consecutive pair of integers have opposite signs.
// For all integers with the same sign, the order in which they were present in nums is preserved.
// The rearranged array begins with a positive integer.
// Return the modified array after rearranging the elements to satisfy the aforementioned conditions.
//
//
//
// Example 1:
//
// Input: nums = [3,1,-2,-5,2,-4]
// Output: [3,-2,1,-5,2,-4]
// Explanation:
// The positive integers in nums are [3,1,2]. The negative integers are [-2,-5,-4].
// The only possible way to rearrange them such that they satisfy all conditions is [3,-2,1,-5,2,-4].
// Other ways such as [1,-2,2,-5,3,-4], [3,1,2,-2,-5,-4], [-2,3,-5,1,-4,2] are incorrect because they do not satisfy one or more conditions.  
// Example 2:
//
// Input: nums = [-1,1]
// Output: [1,-1]
// Explanation:
// 1 is the only positive integer and -1 the only negative integer in nums.
// So nums is rearranged to [1,-1].
//
//
// Constraints:
//
// 2 <= nums.length <= 2 * 105
// nums.length is even
// 1 <= |nums[i]| <= 105
// nums consists of equal number of positive and negative integers.

// Brute Force Approach
// Iterate through the array and store the positive and negative numbers in separate arrays.
// Then, iterate through the positive and negative arrays and fill the original array with the elements from both arrays in alternating order.
// Time Complexity: O(n) + O(n) = O(2n) ~ O(n)
// Space Complexity: O(n)
export function rearrangeArray_brute(nums: number[]): number[] {
  const n = nums.length, positives: number[] = [], negatives: number[] = []

  for (const num of nums) {
    if (num > 0) positives.push(num)
    else negatives.push(num)
  }

  // If the number of positives are greater than the negatives,
  // The loop will run for the length of negatives 
  // Since they are the minority and there are more positives than negatives
  // After the loop, we will fill the remaining elements with the positives
  if (positives.length > negatives.length) {
    // Fill the array with alternating positive and negative numbers
    for (let i = 0; i < negatives.length; i++) {
      nums[2 * i] = positives[i]!
      nums[2 * i + 1] = negatives[i]!
    }

    // Fill the remaining positive numbers
    // We cant just add the elements at the end of the array,
    // Since we are modifying the original array
    let nextIndex = 2 * negatives.length
    for (let i = negatives.length; i < positives.length; i++) {
      nums[nextIndex++] = positives[i]!
    }
  }
  else {
    // Fill the array with alternating positive and negative numbers
    for (let i = 0; i < positives.length; i++) {
      nums[2 * i] = positives[i]!
      nums[2 * i + 1] = negatives[i]!
    }

    // Fill the remaining negative numbers
    // We cant just add the elements at the end of the array,
    // Since we are modifying the original array
    let nextIndex = 2 * positives.length
    for (let i = positives.length; i < negatives.length; i++) {
      nums[nextIndex++] = negatives[i]!
    }
  }

  return nums
}

// Optimal Approach
// Instead of storing the positive and negative numbers in separate arrays,
// We keep track of the last positive and negative indices
// Every time we encounter a number that is not in its correct position,
// We swap it with the number at the next correct position.
// Time Complexity: O(n)
// Space Complexity: O(1)
// Note: This approach modifies the original array and onlu works,
// If the number of positive and negative numbers are equal.
// If the question mentions that the number of positive and negative numbers are not equal,
// We fall back to the brute force approach.
export function rearrangeArray_optimal(nums: number[]) {
  const n = nums.length
  let lastPositiveIndex = -1, lastNegativeIndex = -1

  for (let i = 0; i < n; i++) {
    // Check f the number at the current index is positive
    if (nums[i]! > 0) {

      // Since the current number number is positive,
      // It has to be at an even position
      // If its, not move it to the next even position
      if (i % 2 !== 0) {
        const nextEvenPosition = 2 * (lastPositiveIndex + 1)
        swap(nums, i, nextEvenPosition)
      }

      lastPositiveIndex = i
    }
    else {
      // Since the number is negative,
      // If should be in an odd position
      // If its not, move it to the next odd position
      if (i % 2 === 0) {
        const nextOddPosition = 2 * (lastNegativeIndex + 1) - 1
        swap(nums, i, nextOddPosition)
      }

      lastNegativeIndex = i
    }
  }

  return nums
}


function swap(nums: number[], i: number, j: number) {
  const temp = nums[i]!
  nums[i] = nums[j]!
  nums[j] = temp
}

const start = performance.now()
const result = rearrangeArray_brute([1, 2, -4, -5, 3, 6])
const end = performance.now()
console.log(`Execution time: ${(end - start).toFixed(4)} ms.`)
console.log(result)
