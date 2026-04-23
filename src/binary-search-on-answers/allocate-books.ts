// Given an array ‘arr’ of integer numbers, ‘arr[i]’ represents the number of pages in the ‘i-th’ book.

// There are ‘m’ number of students, and the task is to allocate all the books to the students.

// Allocate books in such a way that:
// 1. Each student gets at least one book.
// 2. Each book should be allocated to only one student.
// 3. Book allocation should be in a contiguous manner.

// You have to allocate the book to ‘m’ students such that the maximum number of pages assigned to a student is minimum.
// If the allocation of books is not possible, return -1.

// Example:
// Input: ‘n’ = 4 ‘m’ = 2
// ‘arr’ = [12, 34, 67, 90]

// Output: 113

// Explanation: All possible ways to allocate the ‘4’ books to '2' students are:
// 12 | 34, 67, 90 - the sum of all the pages of books allocated to student 1 is ‘12’, and student two is ‘34+ 67+ 90 = 191’, so the maximum is ‘max(12, 191)= 191’.
// 12, 34 | 67, 90 - the sum of all the pages of books allocated to student 1 is ‘12+ 34 = 46’, and student two is ‘67+ 90 = 157’, so the maximum is ‘max(46, 157)= 157’.
// 12, 34, 67 | 90 - the sum of all the pages of books allocated to student 1 is ‘12+ 34 +67 = 113’, and student two is ‘90’, so the maximum is ‘max(113, 90)= 113’.
// We are getting the minimum in the last case.

// Hence answer is ‘113’.
// Detailed explanation ( Input/output format, Notes, Images )
// Sample Input 1:
// 4 2
// 12 34 67 90
// Sample Output 1:
// 113
// Explanation of sample input 1:
// All possible ways to allocate the ‘4’ books to '2' students are:
// 12 | 34, 67, 90 - the sum of all the pages of books allocated to student 1 is ‘12’, and student two is ‘34+ 67+ 90 = 191’, so the maximum is ‘max(12, 191)= 191’.
// 12, 34 | 67, 90 - the sum of all the pages of books allocated to student 1 is ‘12+ 34 = 46’, and student two is ‘67+ 90 = 157’, so the maximum is ‘max(46, 157)= 157’.
// 12, 34, 67 | 90 - the sum of all the pages of books allocated to student 1 is ‘12+ 34 +67 = 113’, and student two is ‘90’, so the maximum is ‘max(113, 90)= 113’.
// We are getting the minimum in the last case.

// Hence answer is ‘113’.
// Sample Input 2:
// 5 4
// 25 46 28 49 24
// Sample Output 2:
// 71
// Explanation of sample input 2:
// All possible ways to allocate the ‘5’ books to '4' students are:
// 25 | 46 | 28 | 49 24 - the sum of all the pages of books allocated to students 1, 2, 3, and 4 are '25', '46', '28', and '73'. So the maximum is '73'.
// 25 | 46 | 28 49 | 24 - the sum of all the pages of books allocated to students 1, 2, 3, and 4 are '25', '46', '77', and '24'. So the maximum is '77'.
// 25 | 46 28 | 49 | 24 - the sum of all the pages of books allocated to students 1, 2, 3, and 4 are '25', '74', '49', and '24'. So the maximum is '74'.
// 25 46 | 28 | 49 | 24 - the sum of all the pages of books allocated to students 1, 2, 3, and 4 are '71', '28', '49', and '24'. So the maximum is '71'.

// We are getting the minimum in the last case.

// Hence answer is ‘71’.
// Expected time complexity:
// The expected time complexity is O(n * log(s)), where ‘n’ is the number of integers in the array ‘arr’ and ‘s’ is the sum of all the elements of ‘arr’.
// Constraints:
// 2 <= 'n' <= 10 ^ 3
// 1 <= 'm' <= 10 ^ 3
// 1 <= 'arr[i]' <= 10 ^ 9
// The sum of all arr[i] does not exceed 10 ^ 9.

// Where ‘n’ denotes the number of books and ‘m’ denotes the number of students. ‘arr[i]’ denotes an element at position ‘i’ in the sequence.

// Brute Force Approach
// We need to iterate through the books and assign books to each student.
// One student can have multiple books but one book can be only give to one student
// We need to also keep in mind that the maximum number of page to a student is minimum
// e.g books: [25,46,28,49,24]
// Since we need to assign one book to each, what will be the minimum pages that a student can have.
// We have to pick the maximum value from books[] i.e 49 as if we don't, we cannot asssign a book
// with 49 pages to anyone and that will not fulfil our constraint.
// We can start generating all conbination in which m books can be assigned to k students.
// Eg: ST 1 => 25, ST 2 => 46, ST 3 => 28, ST 4 => 49,24
// We can see that for this case the maximum pasges is 49 + 24 = 73
// We need to minimize this number, thus we keep generating combination
// But how to do this? We take a minimum amount of pages that we can allocate to a student.
// Eg : 49 as already stated above. Next, we iterate over the array and keep track of the pages assigned to a student
// If the sum crosses the limit chosen by us i.e 49, we move to the next student.
// After each iteration, we increase the value of the maximum pages
// 49 => 50 => 51 ....
// Once we find a value such that all books have been assigned to k students, that will be our answer
// TC - O(n * ( Sum of all pages - max pages + 1))
// SC - O(1)
function brute(books: number[], students: number) {
  if (students > books.length) return -1;

  let minPages = Math.max(...books),
    maxPages = books.reduce((acc, val) => acc + val, 0);
  for (let i = minPages; i <= maxPages; i++) {
    const allocatedStudetns = countStudents(books, i);
    if (allocatedStudetns === students) return i;
  }

  return -1;
}

// Optimal Solution
// We knwo that out answer lies between max(books[i]) to sum(books[i])
// Thus, since we know the answers list, we can use binary search.
// TC - O(n * log(sum - max))
// SC - O(1)
function optimal(books: number[], students: number) {
  if (students > books.length) return -1;

  let low = Math.max(...books),
    high = books.reduce((acc, val) => acc + val, 0);

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);

    // This value can be equal,greater and less
    // Observation is that if we increase the value of maxPages/mid, the allocatedStudents will be smaller
    // and if we decrease the value of maxPages/mid, the value allocatedStudents will be greater
    // We will use this observation to eliminate the right/left halves
    const allocatedStudents = countStudents(books, mid);
    // if the count is greater, that means, we need to increase the value of mid
    // We need to eliminate the left half
    if (allocatedStudents > students) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  // Why are we returning low?
  // At the end of the binary search, we see that high has crossed low.
  // At this point, the low will contain the last possible value for which,
  // the students count was equal to the input students
  return low;
}

function countStudents(books: number[], maxPages: number): number {
  const n = books.length;
  let currentMaxPageSum = 0,
    allocatedStudents = 1;
  for (let i = 0; i < n; i++) {
    // We check if adding the pages for the current book is still'
    // less than the maximum pages allowed.
    // If it is, we allocate this book to the student
    if (currentMaxPageSum + books[i]! <= maxPages) {
      currentMaxPageSum += books[i]!;
    }
    // Else, we cannot allocate more books to this student and need to move
    // to the next student
    else {
      // Since we are at chcking the sum at the index,
      // and we are moving to the next student, we need to keep track of the book
      // thus we initialize the value for this student with the current pages
      currentMaxPageSum = books[i]!;
      allocatedStudents++;
    }
  }

  return allocatedStudents;
}

const res = optimal([25, 46, 28, 49, 24], 4);
console.log(res);
