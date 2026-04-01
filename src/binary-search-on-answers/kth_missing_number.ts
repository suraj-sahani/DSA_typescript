// 1539. Kth Missing Positive Number
// Easy
// Topics
// premium lock icon
// Companies
// Hint
// Given an array arr of positive integers sorted
// in a strictly increasing order, and an integer k.

// Return the kth positive integer that is missing from this array.

// Example 1:

// Input: arr = [2,3,4,7,11], k = 5
// Output: 9
// Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.
// Example 2:

// Input: arr = [1,2,3,4], k = 2
// Output: 6
// Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

// Constraints:

// 1 <= arr.length <= 1000
// 1 <= arr[i] <= 1000
// 1 <= k <= 1000
// arr[i] < arr[j] for 1 <= i < j <= arr.length

// Brute Force Approach
// Create a set for all the elements in the input array.
// We keep a count for all the missing numbers
// Once this is done, we start iterating from 1 and for every missing number,
// we increase the count.
// Once the count is equal to k, we have the kth missing number.
// We return it.
// TC - O(n + k) => O(n) for iterating n elements, k for iterating till k to find missing  in case the missing elements are at the end
// SC - O(n)
function brute(nums: number[], k: number) {
  const set = new Set(nums);

  let i = 0,
    count = 0;

  // We keep iterating until out missing count matches k
  while (count < k) {
    i++;

    // Check if the value of i is in the set,
    // if it does not, increase count
    if (!set.has(i)) {
      count++;
    }
  }

  return i;
}

const res = brute([1, 2, 3, 4], 2);
console.log(res);
