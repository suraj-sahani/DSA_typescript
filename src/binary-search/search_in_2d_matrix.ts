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


/* Better Apprach
Since the entire matrix is sorted, we can go to each row
and check if the target is in the row by simply
checking if the target lies between the first and last element of
the row and if does lie, we then apply binary search on the row
TC- O(n  + log m) => O(n) : for iterating over the rows and log m for the one time when we perform binary search
SC - O(1)
*/
function better(mat: number[][], target: number) {
  const rows = mat.length, cols = mat[0]!.length

  for (let i = 0; i < rows; i++) {
    // check if the target can lie between
    // this row.
    if (mat[i]![0]! <= target && target <= mat[i]![cols - 1]!) {
      const arr = mat[i]!
      let low = 0, high = cols - 1

      while (low <= high) {
        let mid = low + Math.floor((high - low) / 2)
        if (arr[mid]! === target) return true
        else if (arr[mid]! > target) high = mid - 1
        else low = mid + 1
      }

    }
  }

  return -1
}


const res = better([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], 7)
console.log(res)
