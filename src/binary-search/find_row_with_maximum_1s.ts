/*
Find the row with maximum number of 1's


Problem Statement: You have been given a non-empty
grid ‘mat’ with 'n' rows and 'm' columns consisting of only 0s and 1s.
All the rows are sorted in ascending order. Your task is to 
find the index of the row with the maximum number of ones. 
Note: If two rows have the same number of ones, consider 
the one with a smaller index. If there's no row with at least 1 zero, return -1

Example 1:
Input Format: n = 3, m = 3, 
mat[] = 
1 1 1
0 0 1
0 0 0
Result: 0
Explanation: The row with the maximum number of ones is 0 (0 - indexed).

Example 2:
Input Format: n = 2, m = 2 , 
mat[] = 
0 0
0 0
Result: -1
Explanation:  The matrix does not contain any 1. So, -1 is the answer.
*/

/*
Brute Force Apprach
Iterate through the matrix while keeping track of the count of 1 for each row
Update maxCount if the current current oneCount is more and update the index at 
which the maxCount has occurred
TC - O(m * n)
SC - O(q)
 */
function brute(arr: number[][]) {
  const rows = arr.length, cols = arr[0]!.length

  let maxCount = -1, maxCountIndex = -1

  for (let i = 0; i < rows; i++) {
    let oneCount = 0

    for (let j = 0; j < cols; j++) {
      oneCount += arr[i]![j]!
    }

    if (oneCount > maxCount) {
      maxCount = oneCount
      maxCountIndex = i
    }
  }

  return maxCountIndex
}


/*
Optimal Solution
Since we have to optimize a n * m matrix,
The rows are sorted so mayne we can optimize the row traversal
by using binary search
The Apprach would be to just find the first one in the row
Once we do, we can automatically find the one count
TC - O(n log m)
SC - O(1)
*/

function optimal(arr: number[][]) {
  const rows = arr.length, cols = arr[0]!.length

  // The only modification we need to make is that we initialize 
  // the maxCount to zero rather than -1 because of the case 
  // where if the row has no 1s, the oneCount will still be updated 
  // as for initial oneCount = -1, when the number of 1s is 0 in a row,
  // the coundition oneCount > maxCount satisfies and it updates the maxCount
  // and maxCountIndex
  let maxCount = 0, maxCountIndex = -1

  for (let i = 0; i < rows; i++) {
    let oneCount = 0;

    // We use the lower bound method to find the first index of 1
    // in each row
    const firstOneIndex = lowerBound(arr[i]!, 1)
    oneCount += cols - firstOneIndex

    if (oneCount > maxCount) {
      maxCount = oneCount
      maxCountIndex = i
    }
  }

  return maxCountIndex
}


function lowerBound(arr: number[], target: number) {
  const n = arr.length

  let low = 0, high = n - 1
  let ans = n

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2)

    if (arr[mid]! >= target) {
      ans = mid
      high = mid - 1
    } else
      low = mid + 1
  }

  return ans
}

const res = optimal([
  [0, 0, 1, 1, 1], [0, 0, 0, 1, 1], [0, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 1, 1, 1, 1]
])

console.log(res)
