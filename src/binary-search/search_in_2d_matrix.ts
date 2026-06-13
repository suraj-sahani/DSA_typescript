/*
Problem Statement: You have been given a 2-D array 'mat'
of size 'N x M' where 'N' and 'M' denote the number of rows
and columns, respectively. The elements of each row are sorted
in non-decreasing order. Moreover, the first element of a row
is greater than the last element of the previous row (if it exists).
You are given an integer ‘target’, and your task is to
find if it exists in the given 'mat' or not.

Examples:
Input :mat = [ [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12] ], target = 8
Output :True.
Explanation :The target = 8 exists in the 'mat' at index (1, 3).

Input :mat = [ [1, 2, 4], [6, 7, 8], [9, 10, 34] ], target = 78
Output :false.
Explanation :The target = 78 does not exist in the 'mat'. Therefore in the output, we see 'false'.
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

const res = brute([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], 7)
console.log(res)
