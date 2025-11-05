// Question Types : 
// 1. Given a row number and a column number, return the value at that position in Pascal's Triangle.
// 2. Given a row number, return the entire row from Pascal's Triangle.
// 3. Gievn N, print the entire Pascal's Triangle up to N rows.


// **************** Category 1 ****************

// Use the combination formula.
// Use (r-1) C (c-1) ; where r is row number and c is column number.
// Which is equal to (r-1)! / ( (c-1)! * ( (r-c)! ) )

function factorial(n: number): number {
  let fact = 1;

  while (n >= 1)
    fact *= n--

  return fact
}
// TC : O(n) + O(c) + O(n-c) = O(n)
// SC : O(1)
function pascalsTriangleValueBrute(row: number, col: number): number {
  const numerator = factorial(row - 1)
  const d1 = factorial(col - 1)
  const d2 = factorial(row - col)

  return (numerator / (d1 * d2))
}

// Optimized Approach 
// Observation:
// for n = 7, r = 2
// 7C2 = 7! / (2! * 5!)
// Which is : 7 * 6 * (5 * 4 * 3 * 2 * 1) / (2 * 1) * (5 * 4 * 3 * 2 * 1)
// Cancelling out the common terms we get => 7 * 6 / 2 * 1
// Thus we can reduce the number of multiplications
// and divisions by cancelling out the common terms.
// Thus, we just multiply till r
// TC : O(r)
// SC : O(1)
function ncr(n: number, r: number): number {
  let res = 1

  for (let i = 0; i < r; i++) {
    res *= (n - i)
    res /= (i + 1)
  }

  return res
}

function pascalsTriangleValue(row: number, col: number): number {
  return ncr(row - 1, col - 1)
}

// **************** Category 2 ****************
// Brtue Force Approach
// Observation 
// Nth row has N elements
// We loop from 0 to c
// Print a value of (n -1) C i for each i from 0 to c-1
// TC : O(n) * O(r) ; O(n) => loop, O(r) => calculating nCr
// SC : O(1)
function cat2Brute(n: number) {
  for (let i = 1; i <= n; i++)
    console.log(ncr(n - 1, i - 1))
}

// Optimal Approach
// Instead of calculating the value of ncr every iteration,
// We reduce the function call
function cat2Optimal(n: number) {
  let res = 1;
  for (let i = 1; i < n; i++) {
    res *= (n - i)
    res /= i

    console.log(res)
  }
}

// ***************** Category 3 **********************
// Since we need to print the entire pascals triangle
// We run nested loop from 1 to n
// Each iteration of i will have i number of variables
// Thus the second loop will run from i to i 
// Inside the second loop we calculate the value at that index using (n - 1) C (r - 1)
// TC - O(n^3) => O(n^2) for nested loop and O(n) for calculating factorial
function cat3Brute(n: number) {
  for (let i = 1; i <= n; i++) {
    const row = [];
    for (let j = 1; j <= i; j++) {
      row.push(ncr(i - 1, j - 1))
    }
    console.log(row)
  }
}

// Optimal Approach
// We will use the category 2 appraoch to get the value at an index
// TC - O(n^2)
// SC - O(1)
function cat3Optimal(n: number) {
  for (let i = 1; i <= n; i++) {
    const ans = [1]
    let res = 1
    for (let j = 1; j < i; j++) {
      res *= (i - j)
      res /= j
      ans.push(res)
    }
    console.log(ans)
  }
}

const res1 = cat3Optimal(5)

