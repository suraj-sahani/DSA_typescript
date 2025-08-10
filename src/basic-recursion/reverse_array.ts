export function reverse_array(index: number, arr: number[]) {
  const n = arr.length;
  if (index > Math.ceil(n / 2)) {
    return arr;
  }

  const temp = arr[index]!;
  arr[index] = arr[n - index - 1]!;
  arr[n - index - 1] = temp;

  return reverse_array(index + 1, arr);
}

const start = performance.now();
const res = reverse_array(0, [1, 2, 3, 4, 5, 6]);
const end = performance.now();
console.log(res);
console.log(`Execution time: ${(end - start).toFixed(4)}ms`);
