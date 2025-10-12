import { generatePermutations, swap } from "../utils";

// 31. Next Permutation
// A permutation of an array of integers is an arrangement of its members into a sequence or linear order.
//
// For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
//
// The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).
//
// For example, the next permutation of arr = [1,2,3] is [1,3,2].
// Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
// While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
//
// Given an array of integers nums, find the next permutation of nums.
//
// The replacement must be in place and use only constant extra memory.
//
// Example 1:
//
// Input: nums = [1,2,3]
// Output: [1,3,2]
//
// Example 2:
//
// Input: nums = [3,2,1]
// Output: [1,2,3]
//
// Example 3:
//
// Input: nums = [1,1,5]
// Output: [1,5,1]
//
//
//
// Constraints:
//
// 1 <= nums.length <= 100
// 0 <= nums[i] <= 100


// Brute Force Approach
// Generate all permutation in a sorted order
// Find the position of the given permutation.
// Return the next permutation if exists else return the first permutation
function next_permutation_brute(nums: number[]) {
  const cpyNums = structuredClone(nums)
  const permutations = generatePermutations(cpyNums)
  const n = permutations.length
  let nextPermutationIndex = -1

  for (let i = 0; i < n; i++) {
    if (permutations[i]?.toString() === nums.toString())
      nextPermutationIndex = i
  }

  // Return an empty array if the permutation whose next 
  // is to be found is not present in the list of permutations
  if (nextPermutationIndex === -1) return []

  if (nextPermutationIndex === n - 1) {
    return permutations[0]!
  }

  return permutations[nextPermutationIndex + 1]!
}

// Optimal Approach
// Observation is we take the example of the dictionary
// In the dictionary, the previous word has some of the same characters as the next word
// For example,  "behest" comes before "behind" in the dictionary
// We can see that the first three characters are same
// So, we have to find the longest matching prefix while iterating from the end of the array
// This will give us the breaking point to find the next permutation
// Once we get the breaking point, we have to find the next smaller element than the breaking point
// If we dont find any breaking point, it means the array is in descending order
// And the next permutation will be the reverse of the array
// If we find the breaking point, we have to swap the breaking point with the next smaller element
// Once we swap, all the items after the breaking point will be in descending order
// Now, the next permutation will simply be ther reverse of the items after the breaking point
// While keeping the items before the breaking point same

// Summary of steps:
// 1. Find the breaking point
// 2. Swap the breaking point with the next smaller element. If not found, reverse the array and return
// 3. Reverse the items after the breaking point
// 4. Return the array
// TC - O(3n) ~ O(n)
// SC - O(1)
function next_permuatation_optimal(nums: number[]) {
  const n = nums.length
  let breakIndex = -1

  // Find the breaking point
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i]! < nums[i + 1]!) {
      breakIndex = i
      break;
    }
  }

  if (breakIndex === -1) return nums.reverse()

  // If there is a breaking point, find the next smaller element
  // Swap and break out of the loop
  for (let i = n - 1; i > breakIndex; i--) {
    if (nums[i]! > nums[breakIndex]!) {
      swap(nums, i, breakIndex)
      break
    }
  }

  // Reverse the elements after the breaking point
  let left = breakIndex + 1, right = n - 1
  while (left < right) {
    swap(nums, left, right)
    left++
    right--
  }

  return nums
}




const start = performance.now()
const result = next_permuatation_optimal([2, 1, 5, 4, 3, 0, 0])
const end = performance.now()
console.log(`Execution time : ${(end - start).toFixed((4))}ms`, result)
