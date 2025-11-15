// 18. 4Sum
// Medium
// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
//
// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.
//
//
//
// Example 1:
//
// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// Example 2:
//
// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]
//
//
// Constraints:
//
// 1 <= nums.length <= 200
// -10^9 <= nums[i] <= 10^9
// -10^9 <= target <= 10^9

// Brute Force Approach
// Run a 4 level nested loop
// If the sum of all elements is equal to the target, 
// push it into the quad arrays
// TC - O(n^4)
// SC - O(2^number of quads), one for the set stroing unique quad and another 
// for returning the quads
function sum4Brute(nums: number[], target: number) {
  const n = nums.length, st = new Set<number[]>()

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        for (let l = k + 1; l < n; l++) {
          if (nums[i]! + nums[j]! + nums[k]! + nums[l]! === target) {
            const quad = [nums[i]!, nums[j]!, nums[k]!, nums[l]!].sort((a, b) => a - b)
            st.add(quad)
          }
        }
      }
    }
  }

  let ans = Array.from(st)
  return ans
}

// Better Approach
// Remove the 4th loop and use the other 3 elements to find the 4th element
// We store the all the elements betwwen the jth and kth iteration in a set
// And check if the forth element is in this set.
// TC - O(n^3 * log number_of_quads) : log m for the searching elements in the hashSet
// TC - O(2 log number_of_quads) : one for returning answer, another for storing unique quads + O(n) : the  temp hashSet
// used to find the forth element
function sum4Better(nums: number[], target: number) {
  const n = nums.length, st = new Set<number[]>()

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const hashSet = new Set<number>()
      for (let k = j + 1; k < n; k++) {
        const toFind = target - (nums[i]! + nums[j]! + nums[k]!)

        if (hashSet.has(toFind)) {
          const quad = [nums[i]!, nums[j]!, nums[k]!, toFind].sort((a, b) => a - b)
          st.add(quad)
        }

        hashSet.add(nums[k]!)
      }
    }
  }

  let ans = Array.from(st)
  return ans
}


// Optimal Approach
// First we sort the array
// We can optimize the time complexity by removing the 
// search for the 4th element in the hashSet
// Also, we can reduce the space complexity by discarding the set to store unique quads
// Since this will be handled while sorting the array 
// TC - O(n^3)
// SC - O(number_of_quads) : only to return the answer
function sum4Optimal(nums: number[], target: number) {
  const n = nums.length, ans: number[][] = []
  nums.sort((a, b) => a - b)
  for (let i = 0; i < n; i++) {
    // Skip step if the current and the last values of nums[i]
    // were same to avoid duplication
    if (i > 0 && nums[i] === nums[i - 1]) continue

    for (let j = i + 1; j < n; j++) {
      // Skip step if the current and the last values of nums[j]
      // were same to avoid duplication
      if (j > i + 1 && nums[j] === nums[j - 1]) continue
      let k = j + 1, l = n - 1

      while (k < l) {
        let sum = nums[i]! + nums[j]!
        sum += nums[k]!
        sum += nums[l]!

        if (sum < target) k++
        else if (sum > target) l--
        else {
          const quad = [nums[i]!, nums[j]!, nums[k]!, nums[l]!]
          ans.push(quad)

          k++
          l--

          while (k < l && nums[k] === nums[k - 1]) k++
          while (k < l && nums[l] === nums[l + 1]) l--
        }
      }

    }
  }

  return ans
}


const res = sum4Optimal([1, 0, -1, 0, -2, 2], 0)
console.log(res)
