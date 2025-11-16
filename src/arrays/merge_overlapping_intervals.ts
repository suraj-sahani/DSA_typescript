// 56. Merge Intervals
// Medium
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
//
//
//
// Example 1:
//
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
// Example 2:
//
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.
// Example 3:
//
// Input: intervals = [[4,7],[1,4]]
// Output: [[1,7]]
// Explanation: Intervals [1,4] and [4,7] are considered overlapping.
//
//
// Constraints:
//
// 1 <= intervals.length <= 10^4
// intervals[i].length == 2
// 0 <= start, <= end <= 10^4


// Brute Force Approach
// Sort the array and run nested loops
// While iterating through the array,
// keep track of each interval and check if the sub-interval next to the current interval
// lies in between it. If it does, update the current intervals bounds
// TC - O(n log n) + O(2n) ; O(n log n) : sorting; O(2n) : we are iterating over each element twice and stopping
// as soon we get an out of bound interval
// SC - O(n) ; for returning the answer
function mergeIntervalsBrute(nums: number[][]) {
  const n = nums.length, ans: number[][] = []
  nums.sort((a, b) => a[0]! === b[0]! ? a[1]! - b[1]! : a[0]! - b[0]!)

  for (let i = 0; i < n; i++) {
    let [cStart, cEnd] = nums[i]!

    const lastMerged = ans[ans.length - 1]

    // Check if the current sub-interval already lies between the last merged
    // If it does, skip this iteration
    if (lastMerged) {
      const [lStart, lEnd] = lastMerged
      // If the current interval is already in the last merged sub-interval,
      // skip the current iteration
      if (cEnd! <= lEnd!) continue
    }


    for (let j = i + 1; j < n; j++) {
      let [start, end] = nums[j]!

      // Check if the end the sub-interval is less than current intervals end 
      // If it is, update the end
      // Note : We only check with the end because no matter what the bounds are,
      // if the start is smaller than the end of the next sub-interval,
      // there can never be a case in which, the next sub-interval can overlap with the previous
      if (start! <= cEnd!) {
        cEnd = Math.max(end!, cEnd!)
      } else break
    }

    ans.push([cStart!, cEnd!])
  }

  return ans
}

const res = mergeIntervalsBrute([[1, 3], [2, 6], [8, 9], [9, 11], [8, 10], [2, 4], [15, 18], [16, 17]])
console.log(res)
