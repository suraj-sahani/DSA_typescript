export function check_array_sort(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]! > arr[i + 1]!) {
      return false;
    }
  }
  return true;
}

const res = check_array_sort([1, 2, 2, 1]);
// const res = check_array_sort([1, 2, 2, 3, 3, 4]);

console.log(res);
