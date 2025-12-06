// Iterative Aproach
// TC - O(log n)
function binary_search_iterative(nums: number[], target: number) {
  const n = nums.length
  let low = 0, high = n - 1, mid

  while (low <= high) {
    // We calculate mid with the approach given because
    // programming languages have an interger limit that can be stored
    // Thus, there might be a case that the upper limit is that INT_MAX
    // and if we are searching for the last element,
    // mid = INT_MAX + INT_MAX / 2, this will cause an overflow
    // To prevent this, we add floow of (high - low)/ 2 which will prevent
    // the overflow. How ?
    // E.g we are searching for the last element => low = high = INT_MAX
    // This low + Math.floor( (high - low) / 2)
    // mid = INT_MAX + Math.floor( (INT_MAX - INT_MAX) / 2)
    // mid = INT_MAX + Math.floor(( 0 / 2)) => INT_MAX
    // Thereby preventing the overflow
    mid = low + Math.floor((high - low) / 2)

    if (nums[mid]! === target) return mid
    else if (nums[mid]! < target) low = mid + 1
    else high = mid - 1
  }

  return -1
}

// Recursive Approach
// TC - O(log n)
function binary_search_recursive(nums: number[], low: number, high: number, target: number) {
  if (low > high) return -1

  let mid = low + Math.floor((high - low) / 2)
  if (nums[mid] === target) return mid
  else if (nums[mid]! < target) return binary_search_recursive(nums, mid + 1, high, target)
  else return binary_search_recursive(nums, low, mid - 1, target)
}

const res = binary_search_recursive([1, 2, 5, 8, 12, 15, 21], 0, 6, 8)
console.log(res)
