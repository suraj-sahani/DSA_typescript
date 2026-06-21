/*
1901. Find a Peak Element II
Medium
A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbors to the left, right, top, and bottom.
Given a 0-indexed m x n matrix mat where no two adjacent cells are equal, find any peak element mat[i][j] and return the length 2 array [i,j].
You may assume that the entire matrix is surrounded by an outer perimeter with the value -1 in each cell.
You must write an algorithm that runs in O(m log(n)) or O(n log(m)) time.

Example 1:
Input: mat = [[1,4],[3,2]]
Output: [0,1]
Explanation: Both 3 and 4 are peak elements so [1,0] and [0,1] are both acceptable answers.

Example 2:
Input: mat = [[10,20,15],[21,30,14],[7,16,32]]
Output: [1,1]
Explanation: Both 30 and 32 are peak elements so [1,1] and [2,2] are both acceptable answers.
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 500
1 <= mat[i][j] <= 10^5
No two adjacent cells are equal.
*/

// Brute force Approach
// Iterate through the entire matrix and check if the current
// element is greater that its adjacent elements on all four sides.
// If it is return the indexes.
// TC - O(n * m * 4), 4 for checking the 4 adjacent elements
// SC - O(1)
function brute(mat: number[][]) {
  const rows = mat.length, cols = mat[0]!.length

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const top = i === 0 ? -1 : mat[i - 1]![j]!
      const left = j === 0 ? -1 : mat[i]![j - 1]!
      const right = j === cols - 1 ? -1 : mat[i]![j + 1]!
      const botton = i === rows - 1 ? -1 : mat[i + 1]![j]!
      const current = mat[i]![j]!
      if (current > top && current > botton && current > left && current > right) return [i, j]
    }
  }

  return [-1, -1]
}

const res = brute([[10, 20, 15], [21, 30, 14], [7, 16, 32]])
console.log(res)
