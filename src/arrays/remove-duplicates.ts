export function remove_deuplicates(arr: number[]) {
  let i = 0,
    j = 0;

  while (j < arr.length) {
    if (arr[i] !== arr[j]) {
      swap(arr, i + 1, j);
      i++;
    }
    j++;
  }
}

function swap(arr: number[], fIndex: number, sIndex: number) {
  const temp = arr[fIndex]!;
  arr[fIndex] = arr[sIndex]!;
  arr[sIndex] = temp;
}

const arr = [1, 1, 2, 2, 2, 3, 3];
remove_deuplicates(arr);
console.log(arr);
