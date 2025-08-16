// Given an array and a sum k
// Print all the subsequences that have the sum k

export function print_subsequnece_k_sum(
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

  const hasFoundAfterPick = print_subsequnece_k_sum(
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
  const hasFoundNotPick = print_subsequnece_k_sum(
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

// Modification/Optimizations
// Print only one subsequence

print_subsequnece_k_sum(0, [1, 2, 1, 5, 6], [], 0, 7);
