// Given an array and a sum k
// Print all the subsequences that have the sum k

export function print_all_subsequneces_k_sum(
  index: number,
  og_arr: number[],
  subsequence: number[],
  curr_sum: number,
  req_sum: number
) {
  const n = og_arr.length;
  if (index === n) {
    // Condition satifies
    if (curr_sum === req_sum) {
      console.log(subsequence);
    }
    return;
  }

  subsequence.push(og_arr[index]!);
  curr_sum += og_arr[index]!;

  print_all_subsequneces_k_sum(
    index + 1,
    og_arr,
    subsequence,
    curr_sum,
    req_sum
  );

  curr_sum -= og_arr[index]!;
  subsequence.pop();

  // Don't pick
  print_all_subsequneces_k_sum(
    index + 1,
    og_arr,
    subsequence,
    curr_sum,
    req_sum
  );
}

// Modification/Optimizations
// Print only one subsequence
// Approach is to check if we fonud the sum after every recursion call
// For this, we make the function return a boolean
// if it returns true, we end the execution of the program
// else we continue finding a subsequence
export function print_one_subsequnece_k_sum(
  index: number,
  og_arr: number[],
  subsequence: number[],
  curr_sum: number,
  req_sum: number
): boolean {
  const n = og_arr.length;
  if (index === n) {
    // Condition satifies
    if (curr_sum === req_sum) {
      console.log(subsequence);
      return true;
    }
    return false;
  }

  subsequence.push(og_arr[index]!);
  curr_sum += og_arr[index]!;

  const hasFoundAfterPick = print_one_subsequnece_k_sum(
    index + 1,
    og_arr,
    subsequence,
    curr_sum,
    req_sum
  );

  // Check if after picking, we fond a subsequence with the required sum
  if (hasFoundAfterPick) return true;
  curr_sum -= og_arr[index]!;
  subsequence.pop();

  // Don't pick
  const hasFoundNotPick = print_one_subsequnece_k_sum(
    index + 1,
    og_arr,
    subsequence,
    curr_sum,
    req_sum
  );

  // Check if after not picking, we fond a subsequence with the required sum
  if (hasFoundNotPick) return true;

  return false;
}

export function count_all_subsequences_k_sum(
  index: number,
  og_arr: number[],
  curr_sum: number,
  req_sum: number
): number {
  const n = og_arr.length;
  if (index === n) {
    if (curr_sum === req_sum) {
      return 1;
    }
    return 0;
  }

  curr_sum += og_arr[index]!;
  // Pick condition
  const l = count_all_subsequences_k_sum(index + 1, og_arr, curr_sum, req_sum);

  curr_sum -= og_arr[index]!;

  const r = count_all_subsequences_k_sum(index + 1, og_arr, curr_sum, req_sum);

  return l + r;
}

// print_all_subsequneces_k_sum(0, [1, 2, 1, 5, 6], [], 0, 7);
// print_one_subsequnece_k_sum(0, [1, 2, 1, 5, 6], [], 0, 7);
const res = count_all_subsequences_k_sum(0, [1, 2, 1, 5, 6], 0, 7);
console.log(res);
