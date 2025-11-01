// Given an (m x n)  matrix, return all elements of the matrix in spiral order.
// Approch left => right, top => bottom, right => left, bottom => top
// TC : O(m * n)
// SC : O(m * n)
function matrixSpiralTraverse(mat: number[][]) {
  const n = mat.length, m = mat[0]?.length || 0, ans: number[] = [];
  let top = 0, left = 0, bottom = n - 1, right = m - 1;

  while (top <= bottom && left <= right) {
    // Note : We do not check for any condition here because we are checking in the for looop itself
    // Print from left to right
    for (let i = left; i <= right; i++) {
      ans.push(mat[top]![i]!)
    }
    top++

    // Print from top to bottom
    for (let i = top; i <= bottom; i++) {
      ans.push(mat[i]![right]!)
    }
    right--

    // Edge Case : Print from right to left only if there is bottom to print
    // i.e the top is still under bottom
    if (top <= bottom) {
      // Print from left to right
      for (let i = right; i >= left; i--) {
        ans.push(mat[bottom]![i]!)
      }
      bottom--
    }

    // Edge Case : Print from bottom to top only if there is left to print
    // ie the right is still over left
    if (left <= right) {
      // Print from bottom to top
      for (let i = bottom; i >= top; i--) {
        ans.push(mat[i]![left]!)
      }
      left++
    }
  }

  return ans;
}

const res = matrixSpiralTraverse([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])

console.log(res)
