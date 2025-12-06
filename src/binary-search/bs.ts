// Iterative Aproach
// TC - O(log n)
function binary_search_iterative(nums: number[], target: number) {
  const n = nums.length
  let low = 0, high = n - 1, mid

  while (low <= high) {
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
