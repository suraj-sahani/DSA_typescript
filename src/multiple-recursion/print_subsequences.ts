export function print_susequences(
  index: number,
  arr: number[],
  temp: number[]
) {
  const n = arr.length;
  if (index >= n) {
    console.log(temp);
    return;
  }
  temp.push(arr[index]!);
  print_susequences(index + 1, arr, temp);
  temp.pop();
  print_susequences(index + 1, arr, temp);
}

print_susequences(0, [3, 1, 2], []);
