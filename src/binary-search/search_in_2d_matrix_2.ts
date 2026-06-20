/* 240. Search a 2D Matrix II
Medium
Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.


Example 1:
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
Example 2:


Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false


Constraints:

m == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-10^9 <= matrix[i][j] <= 10^9
All the integers in each row are sorted in ascending order.
All the integers in each column are sorted in ascending order.
-10^9 <= target <= 10^9
*/

// Brute Force Apprach
// Iterate linearly through the matrix
// TC- O(m * n)
// SC - O(1)
function brute(mat: number[][], target: number) {
  const rows = mat.length, cols = mat[0]!.length

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i]![j]! === target) return true
    }
  }

  return false
}


// Better Approach
// Since the each row is sorted, we can iterate
// over each row and perform a binary search on the
// each row.
// TC - O(n * log m)
// SC - O(1)
function better(mat: number[][], target: number) {
  const rows = mat.length, cols = mat[0]!.length

  for (let i = 0; i < rows; i++) {
    const row = mat[i]!

    let low = 0, high = row.length

    while (low <= high) {
      let mid = low + Math.floor((high - low) / 2)

      if (row[mid]! === target) return true
      else if (row[mid]! < target) low = mid + 1
      else high = mid - 1
    }
  }

  return false
}

const res = better([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 99)
console.log(res)


