// Given an array, print all the elements which are leaders.
// A Leader is an element that is greater than all of the elements on its right side in the array.
//
// Example 1:
// Input:
//  arr = [4, 7, 1, 0]
// Output:
//  7 1 0
// Explanation:
//  Rightmost element is always a leader. 7 and 1 are greater than the elements in their right side.
//
// Example 2:
// Input:
//  arr = [10, 22, 12, 3, 0, 6]
// Output:
//  22 12 6
// Explanation:
//  6 is a leader. In addition to that, 12 is greater than all the elements in its right side (3, 0, 6), also 22 is greater than 12, 3, 0, 6.


// Brute Force approach
// Run a nested look and see if all the elements,
// To the right of the current element are smaller than it.
// If yes, add it to the result array.
// Time Complexity: O(n^2)
// Space Complexity: O(n) -> Only used to store the result, not to solve the problem.
function leadersInArrayBrute(arr: number[]): number[] {
  const n = arr.length, res = []

  for (let i = 0; i < n; i++) {
    let leader = true
    for (let j = i + 1; j < n; j++) {
      if (arr[i]! < arr[j]!) {
        leader = false
        break
      }
    }

    if (leader) res.push(arr[i]!)
  }

  return res
}


// Optimal approach
// Loop from the end of the array to the start,
// While looping, keep track of the maximum element seen so far.
// If the current element is greater than the maximum element seen so far,
// Add it to the result array and update the maximum element.
// Finally, reverse the result array to maintain the original order.
// Time Complexity: O(n)
// Space Complexity: O(n) -> Only used to store the result, not to solve the problem.
function leadersInArrayOptimal(arr: number[]): number[] {
  const n = arr.length, res = []

  res.push(arr[n - 1]!)
  for (let i = n - 2; i >= 0; i--) {
    if (arr[i]! > res[res.length - 1]!) res.push(arr[i]!)
  }

  return res.reverse()
}

const start = performance.now()
const result = leadersInArrayOptimal([10, 22, 12, 3, 0, 6])
const end = performance.now()
console.log(`Execution time: ${(end - start).toFixed(4)}ms`, result)
