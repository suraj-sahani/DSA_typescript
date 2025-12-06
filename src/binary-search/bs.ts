function binary_search_iterative(nums: number[], target: number) {
  const n = nums.length
  let low = 0, high = n - 1, mid

  while (low <= high) {
    mid = (low + high) / 2

    if (nums[mid]! === target) return mid
    else if (nums[mid]! < target) low = mid + 1
    else high = mid - 1
  }

  return -1
}

const res = binary_search_iterative([1, 2, 5, 8, 12, 15, 21], 100)
console.log(res)
