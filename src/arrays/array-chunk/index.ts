// Array Chunk
// Given an array of numbers and a chunk size 'n' as an input, return a new array where the input has been split into arrays of size 'n'

// Input : arr = [1,2,3,4,5,6,7,8], n = 3
// Output : [[1,2,3],[4,5,6],[7,8]]

// Brute Force Solution:
// Iterate through the array and push the elements into a chunk array. If the length of the chunk array is equal to the chunk size, push the chunk array into the result array and reset the chunk array.
// export const arrayChunk = (arr: number[], size: number) => {
//   let chunk = [],
//     res = [],
//     c = 1;

//   for (let i = 0; i < arr.length; i++) {
//     chunk.push(arr[i]);
//     if (c !== size) {
//       c++;
//     } else {
//       res.push(chunk);
//       chunk = [];
//       c = 1;
//     }
//   }

//   // Final Check to see if there are remaining elements left
//   if (chunk.length) res.push(chunk);
//   return res;
// };

// Optimized Solution
// Instead for creating two separate arrays, we take only a single array and push all the elements sliced through the original array.

export const arrayChunk = (arr: number[], size: number) => {
  let res = [],
    currentIndex = 0;

  while (currentIndex < arr.length) {
    res.push(arr.slice(currentIndex, currentIndex + size));
    currentIndex += size;
  }

  return res;
};

const result = arrayChunk([1, 2, 3, 4, 5, 6, 7, 8], 3);
console.log(result);
