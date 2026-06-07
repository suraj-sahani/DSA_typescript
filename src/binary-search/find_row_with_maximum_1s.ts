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
    let oneCount = -1

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


const res = brute([
  [0, 0, 1, 1, 1], [0, 0, 0, 1, 1], [0, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 1, 1, 1, 1]
])

console.log(res)
