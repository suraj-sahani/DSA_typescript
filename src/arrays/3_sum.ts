// 15. 3Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
// such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
//
// Notice that the solution set must not contain duplicate triplets.
//
// Example 1:
//
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation: 
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.
// Example 2:
//
// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.
// Example 3:
//
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.
//
//
// Constraints:
//
// 3 <= nums.length <= 3000
// -10^5 <= nums[i] <= 10^5

// Brute force approach
// Run a 3 layer nested loop
// At each iteration check if the sum is 0
// if it is add it to a set
// TC - O(n^3 * log(unique_elements)) 
// SC - O(2 * unique_triplets) : 1 for set and another for returning the answer
function Sum3Brute(nums: number[]) {
  const n = nums.length, ans: number[][] = []
  const st = new Set<string>()
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i]! + nums[j]! + nums[k]! === 0) {
          // Sort the triplet to avoid duplication
          const triplet = [nums[i]!, nums[j]!, nums[k]!].sort((a, b) => a - b)
          st.add(JSON.stringify(triplet))
        }
      }
    }
  }

  st.forEach(val => ans.push(JSON.parse(val)))

  return ans
}

// Better approach
// We need to remove the third loop to get a better time complexity of O(n^2)
// We need: nums[i] + nums[j] + nums[k] = 0
// Therefore, we can say that nums[k] = -(nums[i] + nums[j])
// To look for this nums[k], we use hashing
// While looking for nums[k], we need to keep in mind that 
// If we find nums[k], it is at a position greater than i and j
// As the problem statement clearly mentions that i!=j!=k
// TC - O(n^2 * log(size_of_set))
// SC : O(n) => all triplets + O(n) => set for numbers
function Sum3Better(nums: number[]) {
  const n = nums.length, ans: number[][] = []
  const st = new Set<string>()


  for (let i = 0; i < n; i++) {
    // Declare a numSet that will hold the values except the one 
    // At nums[i] and nums[j], also numbers between nums[i] and nums[j]
    const numSet = new Set<number>()
    for (let j = i + 1; j < n; j++) {
      const k = -1 * (nums[i]! + nums[j]!)
      // Check if k is in the set
      if (numSet.has(k)) {
        const triplet = [nums[i]!, nums[j]!, k].sort((a, b) => a - b)
        st.add(JSON.stringify(triplet))
      }
      // Add the current element to the set
      numSet.add(nums[j]!)
    }
  }

  st.forEach(val => ans.push(JSON.parse(val)))

  return ans

}

// Optimal approach
// We cannot optimize the time complexity further.
// Thus, we reduce the space complexity by not using unique set of arrays
// We can omit the storing of unique triplets by sorting the array
// TC - O(n^2) => Nested Loop + O(n log n) => sort the original array
// SC - O(number of unique elements) => to store a triplet at each iteration, the array 
// to return the ans is not being counted
function Sum3Optimal(nums: number[]) {

  const n = nums.length, ans: number[][] = []
  nums.sort((a, b) => a - b)

  for (let i = 0; i < n; i++) {
    // Increment i unitil it does not give the same element that 
    // was taken in a previous iteration to avoid deduplication
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let j = i + 1, k = n - 1
    // We will use the two-pointer approach to calculate the sum while
    // keeping i as constant and modifying j and k
    while (j < k) {
      const sum = nums[i]! + nums[j]! + nums[k]!
      // If sum is less than zero we increment j
      // since the array is sorted we will get a larger sum
      if (sum < 0) {
        j++
      }
      // If sum is greater than 0 we need to reduce it,
      // thus we decrement k
      else if (sum > 0) {
        k--
      }
      //If both condition do not satisfy, it mean sum is equal to 0
      else {
        const triplet = [nums[i]!, nums[j]!, nums[k]!]
        ans.push(triplet)
        j++
        k--

        // If the sum is equal to zero, we need to both increase j and decrease k
        // But, we need to make sure that this increment is within the bounds of the array
        // and the index we are incrementing or decrementing does not give us the same number at 
        // any particular index that was already used in previous iteration, making sure we avoid duplication of triplets
        while (j < k && nums[j] === nums[j - 1]) j++
        while (j < k && nums[k] === nums[k + 1]) k--
      }
    }
  }

  return ans
}

const res = Sum3Optimal([-1, 0, 1, 2, -1, -4])
console.log(res)
