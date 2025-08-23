function swap(arr: number[], i: number, j: number) {
  const temp = arr[i]!;
  arr[i] = arr[j]!;
  arr[j] = temp;
}

function partition(arr: number[], low: number, high: number) {
  // choose the pivot
  let pivot = arr[high]!;

  // index of smaller element and indicates
  // the right position of pivot found so far
  let i = low - 1;

  // traverse arr[low..high] and move all smaller
  // elements to the left side. Elements from low to
  // i are smaller after every iteration
  for (let j = low; j <= high - 1; j++) {
    if (arr[j]! < pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  // move pivot after smaller elements and
  // return its position
  swap(arr, i + 1, high);
  return i + 1;
}

export function quick_sort(arr: number[], low: number, high: number) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quick_sort(arr, low, pivot - 1);
    quick_sort(arr, pivot + 1, high);
  }
}

const arr = [3, 25, 6, 1, 7, 0];
quick_sort(arr, 0, arr.length - 1);
console.log(arr);
