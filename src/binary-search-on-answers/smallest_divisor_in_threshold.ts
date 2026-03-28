// 1283. Find the Smallest Divisor Given a Threshold
// Medium
// Given an array of integers nums and an integer threshold,
// we will choose a positive integer divisor, divide all the array by it,
// and sum the division's result. Find the smallest divisor
// such that the result mentioned above is less than or equal to threshold.

// Each result of the division is rounded to the
// nearest integer greater than or equal to that element.
// (For example: 7/3 = 3 and 10/2 = 5).

// The test cases are generated so that there will be an answer.

// Example 1:

// Input: nums = [1,2,5,9], threshold = 6
// Output: 5
// Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1.
// If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).
// Example 2:

// Input: nums = [44,22,33,11,1], threshold = 5
// Output: 44

// Constraints:

// 1 <= nums.length <= 5 * 10^4
// 1 <= nums[i] <= 10^6
// nums.length <= threshold <= 10^6

// Brute Force Approach
// We ietrate from the smalled possible value to the largest possible value,
// For each iteration, we check if the sum <= divisor,
// We return -1 if there is no answer.
// TC - O(n * (max - min))
// SC - O(1)

function brute(nums: number[], threshold: number) {
  const min = Math.min(...nums),
    max = Math.max(...nums);

  for (let i = min; i <= max; i++) {
    const isPossible = checkThresholdPossibility(i, nums, threshold);

    if (isPossible) return i;
  }

  return -1;
}

function checkThresholdPossibility(
  curr: number,
  nums: number[],
  threshold: number,
) {
  const n = nums.length;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += Math.ceil(nums[i]! / curr);
  }

  if (sum <= threshold) return true;

  return false;
}

const res = brute([44, 22, 33, 11, 1], 5);
console.log(res);
