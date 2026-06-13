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

  return false
}

/*
Optimal Apprach
As the matrix is itselt soryed, if we observe carefully, if we flatten the 
matrix, it will give us a 1D array of size m*n and if we apply
binary search on this 1D array the time complexity will be log(m*n)
This, we will follow this approach but actually not flatten the array
as flattening the array itself will take O(m*n) time, thus we need
to dervie a formula for this.
Let assume the array is a 1D array, if we try to find the mid and
map the mid into a coordinate, our job will be done.
Formula : 
row = index / cols ;where index is the mid for the 1D array.
col = index % cols

What is the intuition behind the formula
Example arr : Number in the brackets in the 1D indexing

0   [5(0)   4(1)   6(2)   8(3)]
1   [10(4)  12(5)  13(6)  15(7)]
2   [17(8)  18(9)  19(10)   20(11)]

The first column has indexing in multiples of 4
this is because every row has "m" numbers
Thereby in order to get the rows index, we divide by "m"
To get the cols index, it is similar as at any point, we know 
that a multiple of "m" elements are before the current index,
thus to find the cols, we just mod it by 'm'

TC - O(log (m * n))
SC - O(1)
*/
function optimal(mat: number[][], target: number) {
  const rows = mat.length, cols = mat[0]!.length

  let low = 0, high = (rows * cols) - 1

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2)

    // Do not forget to floor the row as it might result in a floating point value
    const row = Math.floor(mid / cols), col = mid % cols

    if (mat[row]![col]! === target) return true
    // Note that we arw still updating the 1D index 
    else if (mat[row]![col]! > target) high = mid - 1
    else low = mid + 1
  }

  return false
}

const res = optimal([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], 19)
console.log(res)
