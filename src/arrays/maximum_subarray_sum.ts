// 53. Maximum Subarray
// Given an integer array nums, find the subarray with the largest sum, and return its sum.
//
// Example 1:
//
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
// Example 2:
//
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.
// Example 3:
//
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

// Brute Force Approach
// Run nested loops to consider all subarrays
// For each subarray, calculate the sum and update maxSum if needed
// TC - O(n^3), SC - O(1)
export function maxSubArraySum_brute(nums: number[]): number {
  const n = nums.length
  const maxSub: number[] = [];
  let maxSum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {

      let subArraySum = 0;
      const tempSub: number[] = []
      // Calculate sum of subarray from i to j
      for (let k = i; k <= j; k++) {
        subArraySum += nums[k]!;
        // Push current element to temp subarray
        tempSub.push(nums[k]!)

        // Check if current subarray sum is greater than max sum found so far
        if (subArraySum > maxSum) {
          // Reset maxSub array and update maxSum
          maxSub.length = 0;
          maxSum = subArraySum;
          maxSub.push(...tempSub);
        }
      }
    }
  }
  console.log('Max SubArray:', maxSub);
  return maxSum
}

// Better Approach
// Instead of running the 3rd loop to calculate the sum of subarray from i to j,
// TC - O(n^2), SC - O(1)
export function maxSubArraySum_better(nums: number[]): number {
  const n = nums.length
  const maxSub: number[] = [];
  let maxSum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < n; i++) {
    let subArraySum = 0;
    const tempSub: number[] = []
    for (let j = i; j < n; j++) {
      // Calculate sum of subarray from i to j
      subArraySum += nums[j]!;
      // Push current element to temp subarray
      tempSub.push(nums[j]!)
      // Check if current subarray sum is greater than max sum found so far
      if (subArraySum > maxSum) {
        // Reset maxSub array and update maxSum
        maxSub.length = 0;
        maxSum = subArraySum;
        maxSub.push(...tempSub);
      }
    }
  }
  console.log('Max SubArray:', maxSub);
  return maxSum
}


// Optimal Approach - Kadane's Algorithm
// Iterate through the loop while keeping tract of maxSum and currentSum
// When updateing currentSum, check if the sum is positive or negative
// If the sum is negative, reset currentSum to 0
// Else check if currentSum is greater than maxSum, if yes update maxSum
// TC- O(n), SC - O(1)
export function maxSubArraySum_optimal(nums: number[]): number {
  const n = nums.length
  let maxSum = Number.MIN_SAFE_INTEGER, currentSum = 0, subArrayStartIndex = 0, subArrayEndIndex = 0
  for (let i = 0; i < n; i++) {
    // Since we are resetting currentSum to 0 when it becomes negative
    // The subarray start index will be the current index when currentSum is 0
    if (currentSum === 0) subArrayStartIndex = i

    currentSum += nums[i]!

    if (currentSum > maxSum) {
      maxSum = currentSum
      // When maxSum is updated, the subarray end index will be the current index
      subArrayEndIndex = i
    }

    else if (currentSum < 0) {
      subArrayStartIndex = i
      currentSum = 0
    }
  }

  console.log('Max SubArray:', nums.slice(subArrayStartIndex, subArrayEndIndex + 1));

  // Edge case 
  // If the question mentions that sum has be to greater than 0
  // Check if maxSum is negative, if yes return 0
  // Else return maxSum
  return maxSum < 0 ? 0 : maxSum
}


const start = performance.now();
const result1 = maxSubArraySum_optimal([-2, -3, 4, -1, -2, 1, 5, -3]);
const end = performance.now();
console.log(`Result: ${result1}, Time taken: ${(end - start).toFixed(4)} ms`);
