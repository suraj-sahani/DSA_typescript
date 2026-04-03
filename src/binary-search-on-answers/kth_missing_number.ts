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

// Better Approach
// Observation, for any array with no missing numbers,
// arr[i] === i+1
// If any number is missing, arr[i] becomes greater that i + 1
// and the elements before it is arr[i] - (i+1)
// TC - O(n)
// SC - O(1)
function better(nums: number[], k: number) {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    if (nums[i]! > k + i) return k + i;
  }

  // If all number in the array are present,
  // then that mean the missing number is at the end,
  // thus the kth missing number will be k + n
  return k + n;
}

// Deductions
// 1. We cannot apply binary search because,
// we are trying to find the missing number and that number,
// will not be in out input array.
// 2. We also cannot apply binary search on answers because "BS on answers"
// is only applicable when we are looking for minimum or maximum
// and also, we know that the the answer will be on either of the halves,
// but in this question, that is not the case

// Then, how do we apply ninary search on this question,
// For arr = [2,3,4,7,11], k = 5, ans = 9
// If can somehow figure out the two indexes between which our answers lie, the question is solved.
// Approach, for the above example is that for k = 5,
// we can be sure that the answer lies between 2 and 11.
// for k = 3, ans = 6 and it lies between 4 and 7
// thus, we just need to find the answer and the two indexes in which the answer lies
// Target 1: Find the answer
// Target 2: Figure out two nearby indexes

// Target 2
// How to find out the two nearby answers?
// We will be using k,
// Ideally the number should have been [1,2,3,4,5] but we have [2,3,4,7,11]
// To find the number of missing number, we take the actual number at an index and then subtract it what the ideal number is.
// Thus, at index : 4, missing numbers = 7 - 4 = 3
// or
// at index 5, missing numbers = 11 - 5 = 6
// And since the question asks for the 5 the missing number, and the missing number
// at index 4 = 3 and at index 5 = 6,
// k = 5 lies between these two indexes as 5 comes between 3 and 6
// So, we generate an array of missing number at each index,
// missing = [1,1,1,3,6] and apply binary search on the missing numbers array
// We keep eliminating until low and high cross and there will be a point where low > k and high < k
// These values of low and high will be my two nearby indexes.
//
// Target 1:
// To find the missing number, we get the number at arr[high] and find the number of missing
// numbers at the index.
// We then just take the different of k and number of missing number at arr[high]
// and add the difference to arr[high]
// Note : arr[high] might not be correct
// eg arr = [4,7,9], k = 3, the ans = 3
// and thus the in the arr, high will be before the 0th index
// Thus we need to figure out a formula to get the answer
// For eg, arr = [2,3,4,7,11], k = 5, ans = 9
// arr[high] = 7, missing = 3, more_required_to_match_k = 2
// Calculation for missing = arr[high] - (high + 1) => arr[high] - high - 1
// Also, we know that the answer is arr[high] + more,
// and more can be written as more = k - missing
// Therefore, ans = arr[high] + more => arr[high] + k - missing
// or
// ans = arr[high] + k - (arr[high] - high - 1) => arr[high] + k - arr[high] + high + 1
// ans = k + high + 1
// TC - O(log n)
// SC - O(1)
function optimal(nums: number[], k: number) {
  const n = nums.length;

  let low = 0,
    high = n - 1;

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);

    // We need to calculate the missing number at this index,
    // We get it by subtracting the current value at the index with the value that should have been there
    let missing = nums[mid]! - (mid + 1); // => mid + 1 because array is zero indexed but values are not i.e at index : 0, arr[0] should be 1

    // We compare missing with such that we can get two number in between which,
    // k lies.
    // Thus if the missing number is less than k we need to go to the right
    // to find the closest number that is less than or equal to k
    if (missing <= k) {
      low = mid + 1;
    }
    // Else, if it is greater, we go the left to find the closest number to k that is greater than k
    else {
      high = mid - 1;
    }
  }

  return high + k + 1;
}

const res = optimal([2, 3, 4, 7, 11], 5);
console.log(res);
