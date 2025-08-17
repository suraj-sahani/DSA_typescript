// Merge Sort
// Follows the divide and merge approach recursively
// in each iteration, divide the array into two parts(might be unequal)
// continue dividing until the array cannot be divided further i.e has only one element
// start comparing which element should appear first and merge them into a single array.

export function merge_sort(arr: number[], low: number, high: number) {
  // base case is to return when the low and high are same as only then
  // we cannot divide further as there will only be one element in the array
  if (low >= high) {
    return;
  }
  let mid = Math.floor((low + high) / 2);

  // Divide the first half
  merge_sort(arr, low, mid);
  // Divide the second half
  merge_sort(arr, mid + 1, high);
  // Once both the halves are divided, merge them
  merge_arrays(arr, low, mid, high);
}

// The merge function is responsible for merging the arrays.
// it will merge two hypothetical arrays.
// first array will be from low to mid
// second from mid + 1 to high
// create a temporary array to add the elements accordingly
function merge_arrays(arr: number[], low: number, mid: number, high: number) {
  const temp: number[] = [];
  let left = low;
  let right = mid + 1;

  // Since we have two hypothetical arrays, we compare the elements of each array
  // then add it to the temp array

  while (left <= mid && right <= high) {
    if (arr[left]! <= arr[right]!) {
      temp.push(arr[left]!);
      left++;
    } else {
      temp.push(arr[right]!);
      right++;
    }
  }

  // there will be conditions where either side of the arrays have still some elements left
  // for such case, we add the remaining elements to the array
  while (left <= mid) {
    temp.push(arr[left]!);
    left++;
  }

  // there will be conditions where either side of the arrays have still some elements right
  // for such case, we add the remaining elements to the array
  while (right <= high) {
    temp.push(arr[right]!);
    right++;
  }

  // Now that both the arrays have been merged and in sorted order,
  // we replace the original array with the temp

  for (let i = low; i <= high; i++) {
    // Why i - low ?
    // We are creating a temp array and storing the sorted number just for the portion of low - high
    // that means temp[0] = arr[low] => temp[1] = arr[low+1] .... temp[high - low] = arr[high]
    // So, temp is shifted by "low" indices as compared to arr
    // without  i - low, temp[i] will go out of bounds
    // Example: arr = [2,0,2,1,3,1,8] and we  merge arr[2 to 4] = [2,1,3]
    // low = 2, high = 4
    // after merging, temo is [1,2,3]
    // since after merging, we need to copy it back to the original array
    // arr[2] = temp[2 - 2] = temp[0] = 1;
    // arr[3] = temp[3 - 2] = temp[1] = 2;
    // arr[4] = temp[4 - 2] = temp[2] = 3;
    // If we had used arr[i] = temp[i],
    // it would look for temp[2], temp[3], temp[4] — which don’t exist (since temp only has indices 0..2). ❌
    arr[i] = temp[i - low]!;
  }
}

const arr = [2, 0, 2, 1, 3, 1, 8];
merge_sort(arr, 0, arr.length - 1);
console.log(arr);
