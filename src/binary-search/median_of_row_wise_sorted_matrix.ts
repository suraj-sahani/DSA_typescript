// Problem Statement:
// Given a row - wise sorted matrix of size M * N, where M is no.of rows and N is no.of columns,
// find the median in the given matrix.
// Note: M * N is odd.

// Examples
// Input: M = 3, N = 3, matrix[][] =
// 1 4 9
// 2 5 6
// 3 8 7
// Output: 5
// Explanation:
// If we find the linear sorted array, the array becomes 1 2 3 4 5 6 7 8 9. Therefore, median = 5
//
// Input: M = 3, N = 3, matrix[][] =
// 1 3 8
// 2 3 4
// 1 2 5
// Output: 3
// Explanation:
// If we find the linear sorted array, the array becomes 1 1 2 2 3 3 4 5 7 8. Therefore, median = 3.

// Brute Force Appraoch
// Conver the matrix into a 1D array
// return the (n/2)th element since m and n are
// odd, the 1D array will always be odd
// TC - O(m * n)
// SC - O(1)
function brute(matrix: number[][]): number{
  const n = matrix.length, m = matrix[0].length
  const arr = []

  for (let i = 0; i < n; ++i){
    for (let j = 0; j < m; ++j){
      arr.push(matrix[i][j])
    }
  }

  arr.sort((a, b) => a - b)
  console.log(arr)
  const arrSize = arr.length

  return arr[Math.floor(arrSize/2)]
}

const res = brute([[1, 4, 9], [2, 5, 6], [3, 7, 8]])
console.log(res)
