// 128. Longest Consecutive Sequence
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.
//
// Example 1:
//
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. 
// Therefore its length is 4.
// Example 2:
//
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9
// Example 3:
//
// Input: nums = [1,0,1,2]
// Output: 3
//
//
// Constraints:
//
// 0 <= nums.length <= 10^5
// -10^9 <= nums[i] <= 10^9

// Brute Force Approach: O(n^2) time complexity
// Space complexity: O(1)
function longestConsecutiveSequenceBrute(nums: number[]): number {
  const n = nums.length
  let maxLength = 0

  // Run a nested loop
  // For each element x, try to find x + 1
  for (let i = 0; i < n; i++) {
    let currentValue = nums[i]!, sequenceCount = 1

    for (let j = 0; j < n; j++) {
      if (nums[j]! === currentValue + 1) {
        sequenceCount++
        currentValue++
        // Reset the loop to start searching for the next consecutive number
        // Beacuse it can happen that x + 1 comes after x + 2 in the array
        // Thus, we need to start searching from the beginning again
        // To avoid missing any consecutive numbers
        j = 0
      }
    }

    if (sequenceCount > maxLength) maxLength = sequenceCount
  }

  return maxLength

}

// Better Approach: O(n log n) time complexity due to sorting
// Space complexity: O(1)
function longestConsecutiveSequenceBetter(nums: number[]): number {
  const n = nums.length

  if (n === 0) return 0

  let maxLength = 1, tempMaxLength = 0, lastSmaller = Number.MIN_SAFE_INTEGER

  // Sort the array
  nums.sort((a, b) => a - b)

  // Iterate through the sorted array and count consecutive sequences
  for (let i = 0; i < n; i++) {
    if (nums[i]! - 1 === lastSmaller) {
      tempMaxLength++
      lastSmaller = nums[i]!
    }
    else if (nums[i] !== lastSmaller) {
      tempMaxLength = 1
      // Update last smaller when the adjacent numbers are not consecutive
      // And reset tempMaxLength
      lastSmaller = nums[i]!
    }

    maxLength = Math.max(maxLength, tempMaxLength)
  }

  return maxLength
}

function longestConsecutiveSequenceOptimal(nums: number[]): number {
  const n = nums.length

  if (n === 0) return 0

  let maxLength = 1, set = new Set<number>()

  // Add all elemetns to the set to create unique collection
  for (let i = 0; i < n; i++) set.add(nums[i]!)

  // Iterate through the set
  // For each element of the iteration, check if there is a value of element - 1 in the set
  // If there is, update the count of the sequence
  // To get the start of the sequence
  set.values().forEach(val => {
    // Check if ther current element is the start of a sequence
    // We do this by checking if there is no element of value - 1 in the set
    if (set.has(val) && !set.has(val - 1)) {
      let tempLength = 1, currentValue = val
      // For each element, check if there is a value of element + 1 in the set
      // If there is, update the count of the sequence
      while (set.has(currentValue + 1)) {
        currentValue = currentValue + 1,
          tempLength++
      }

      maxLength = Math.max(maxLength, tempLength)
    }
  })


  return maxLength
}



const start = performance.now()
const result = longestConsecutiveSequenceOptimal([100, 102, 104, 100, 101, 4, 3, 3, 3, 2, 4, 2, 1, 3, 1, 1])
const end = performance.now()
console.log(`Execution time : ${(end - start).toFixed(4)}ms`, result)


