// 48. Rotate Image
// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
//
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
//
// Example 1:
//
//
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [[7,4,1],[8,5,2],[9,6,3]]
// Example 2:
//
//
// Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
// Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
//
//
// Constraints:
//
// n == matrix.length == matrix[i].length
// 1 <= n <= 20
// -1000 <= matrix[i][j] <= 1000

import { swap } from "../utils"

// e : (row,col) => (col, col - row)
// 1 : (0,0) => (0, n - 1)
// 2 : (0,1) => (1, n - 1)
// 3 : (0,2) => (2, n - 1)
// 4 : (0,3) => (3, n - 1)
// 5 : (1,1) => (0, n - 2)
// 6 : (1,2) => (2, n - 2)

// Brute Force Approach
// Obervation: The element at position (i, j) moves to (j, n - i - 1)
// TC: O(n^2)
// SC: O(n^2)
function rotateMatrixBrute(matrix: number[][]) {
  const rows = matrix.length
  const cols = matrix[0]?.length || 0
  const rotatedMatrix: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotatedMatrix[j]![cols - i - 1] = matrix[i]![j]!
    }
  }

  return rotatedMatrix
}

// Better Approach
// Observation : Each column of the matrix becomes a row in the rotated matrix
// Transpose(rows becomes columns and columns become rows) the matrix and 
// then reverse each row
function rotateMatrixOptimal(matrix: number[][]) {
  const rows = matrix.length
  const cols = matrix[0]?.length || 0

  // Transpose the matrix
  // We don't need to transpose the entire matrix, just the upper triangle
  // thus reducing the number of swaps by half
  for (let i = 0; i < rows; i++) {
    for (let j = i + 1; j < rows; j++) {
      const temp = matrix[i]![j]!
      matrix[i]![j] = matrix[j]![i]!
      matrix[j]![i] = temp
    }
  }

  // Reverse each row
  for (let i = 0; i < rows; i++) {
    let left = 0, right = matrix[i]!.length
    while (left < right) {
      const temp = matrix[i]![left]!
      matrix[i]![left] = matrix[i]![right - 1]!
      matrix[i]![right - 1] = temp

      left++
      right--
    }
  }

  return matrix
}

const start = performance.now()
const res = rotateMatrixOptimal([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])
const end = performance.now()
console.log(`Execution time: ${(end - start).toFixed(4)} ms`, res)
