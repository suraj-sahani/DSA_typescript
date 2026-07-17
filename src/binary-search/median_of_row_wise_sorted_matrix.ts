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
// TC - O(m * n) + O(n * m * log(n * m))
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
  const arrSize = arr.length

  return arr[Math.floor(arrSize/2)]
}

// Optimal Approach
// Since we know that the matrix is sorted row-wise,
// we need to apply binary search.
// One thing we can be sure is that the median lies in
// the middle of the sorted elements and that it will
// lie between the smallest and the largest element
// Since the element is in the middle, lets say that the
// matrix has exactly 11 elements, thus there will be exactly
// 5 elements to the left and 5 elements to the right of the element
// But, we cannot say this for sure that all the elements to the left
// of the median are smaller or all the elements to the right of the median
// are larger than the median itself.
// For the same example were n*m = 11,
// lets take arr = [1,2,2,4,5,5,7,8,9,10,11], median = 5
// in this example, we can clearly see that there are  5 elements to the
// left that are <= median. The observation is that the number of elements
// greater than the median and thus, we need to find out the
// first occurrence of an element where the number of elements before it
// is more than the median

function upper_bound(nums: number[], target: number) {
  const n = nums.length
  let low = 0, high = n - 1, bound = n, mid

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    // If the number at the current index matches the condition,
    // We can say that this could be our answer
    // But we need to find the smallest possible index, thus, we
    // narrow our search before this and update high
    if (nums[mid]! > target) {
      bound = mid
      high = mid - 1
    }
    // If condition does not satisfy, look at the right
    else
      low = mid + 1
  }

  return bound
}

// To find the number of elements smaller than equal to the comparator,
// we can iterate linearly but it will take O(m * n) time and we don't want this.
// Thus we will use the row-wise sorted property tom optimize this.
// Since every row is sorted, we iterate through the rows linearly
// and for each row, we apply binary search and calculate the number of smaller elements
// or we can use the upper-bound stratery which will point us to the first element
// that if greater than the given value, we can use the index then to find
// the number of elements smaller than equal to the given value
// TC - O(n * log m)
// SC - O(1)
function findSmallerEquals(matrix: number[][], comparator: number): number {
  const n = matrix.length, m = matrix[0].length
  let count = 0
  for (let i = 0; i < n; ++i){
    count+= upper_bound(matrix[i], comparator)
  }
  return count
}

// TC - O(log max_element) * O(n * log m)
// O(log max_element) since we are applying binary search on the array elements
// which rander from 1 to max_element
// SC - O(1)
function optimal(matrix: number[][]): number {
  const n = matrix.length, m = matrix[0].length
  const required = Math.floor((n * m) / 2)
  let low = -1, high = -1, mid

  for (let i = 0; i < n; ++i){
    low = Math.min(matrix[i][0])
  }

  for (let i = 0; i < m; ++i){
    high = Math.max(matrix[i][m - 1])
  }

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)
    // Find the number of elements that are less than equal to mid
    let smallerEqualsCount = findSmallerEquals(matrix, mid)

    // If the count is less than equal to the required, we
    // elminate the left search space as we need to get to the
    // first occurrence when the count is greater that the required element
    if (smallerEqualsCount <= required) low = mid + 1
    else high = mid - 1
  }

  return low
}

const res = optimal([[1, 4, 9], [2, 5, 6], [3, 7, 8]])
console.log(res)
