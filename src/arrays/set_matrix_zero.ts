// 73. Set Matrix Zeroes
// Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
//
// You must do it in place.
//
// Example 1:
//
// Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
// Output: [[1,0,1],[0,0,0],[1,0,1]]
// Example 2:
//
// Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
//
//
// Constraints:
//
// m == matrix.length
// n == matrix[0].length
// 1 <= m, n <= 200
// -2^31 <= matrix[i][j] <= 2^31 - 1
//
//
// Follow up:
//
// A straightforward solution using O(mn) space is probably a bad idea.
// A simple improvement uses O(m + n) space, but still not the best solution.
// Could you devise a constant space solution?


// Brue Force approach:
// TC - O(m * n) * O(m + n) + O(m*n) ~ O((m*n)*(m+n))
// SC - O(1)
function setMatixZeroBrute(matrix: number[][]) {
  const rows = matrix[0]?.length || 0
  const cols = matrix.length

  // Iterate through the matrix to find zeros
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix?.[j]?.[i] === 0) {
        // set entire row to zero
        markRow(matrix, j)
        // set entire column to zero
        markColumn(matrix, i)
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix?.[i]?.[j] === -1) {
        matrix[i]![j] = 0
      }
    }
  }


  return matrix
}

// Better Approach:
// Ierate through the matrix to find zeros and store their row and column indices in arrays
// This indicates that we need to set these rows and columns to zero
// TC - O(m * n) + O(m * n) ~ O(m * n)
// SC - O(n) + O(m) => arrays to store rows and columns to be changed

function setMatixZeroBetter(matrix: number[][]) {
  const rows = matrix[0]?.length || 0, cols = matrix.length
  const toChangeRows = new Array(rows).fill(0)
  const toChangeCols = new Array(cols).fill(0)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i]?.[j] === 0) {
        toChangeRows[i] = 1
        toChangeCols[j] = 1
      }
    }
  }

  // Iterate through the matrix again and check
  // If the current row or column is marked to be changed, set the element to zero
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (toChangeRows[i] === 1 || toChangeCols[j] === 1) {
        matrix[i]![j] = 0
      }
    }
  }

  return matrix
}

// Optimal Approach:
// We use the exact method as the better approach but instead of using extra arrays
// We use the first row and first column of the matrix itself to store the information
// TC - O(m * n) + O(m * n) ~ O(m * n)
// SC - O(1)
function setMatixZeroOptimal(matrix: number[][]) {
  const rows = matrix.length
  const cols = matrix[0]?.length || 0

  // Store the first element of first row and first column
  // As it is an elemnt that will be common to both row and column
  let e0 = matrix[0]?.[0] === 1 ? 1 : 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      if (matrix[i]?.[j] === 0) {
        // Mark the ith row
        matrix[i]![0] = 0

        // Check if we are in the first column
        if (j === 0) e0 = 0
        // mark the jth column

        else
          matrix[0]![j] = 0
      }
    }
  }


  // Set all the required rows and columns to zero
  // Ecxept the first row and first column
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i]?.[0] === 0 || matrix[0]?.[j] === 0) {
        matrix[i]![j] = 0
      }
    }
  }

  // Check if first row needs to be set to zero
  if (matrix[0]?.[0] === 0) {
    for (let j = 0; j < cols; j++) {
      matrix[0]![j] = 0
    }
  }

  // Check if first column needs to be set to zero
  if (e0 === 0) {
    for (let i = 0; i < rows; i++) {
      matrix[i]![0] = 0
    }
  }

  return matrix
}

function markRow(matrix: number[][], row: number) {
  const cols = matrix[0]?.length || 0

  for (let j = 0; j < cols; j++) {
    if (matrix?.[row]?.[j] !== 0) {
      matrix[row]![j] = -1
    }
  }
}

function markColumn(matrix: number[][], col: number) {
  const row = matrix.length

  for (let j = 0; j < row; j++) {
    if (matrix[row]?.[j] !== 0) {
      matrix[j]![col] = -1
    }
  }
}

const start = performance.now()
const result = setMatixZeroOptimal([[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 1, 1]])
const end = performance.now()
console.log(`Execution time: ${(end - start).toFixed(4)} ms`, result)
