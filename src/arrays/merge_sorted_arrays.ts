
function brute(nums1: number[], nums2: number[]) {
  const n1 = nums1.length, n2 = nums2.length
  let left = 0, right = 0, idx = 0
  const nums = []

  while (left < n1 && right < n2) {
    if (nums1[left]! < nums2[right]!) {
      nums[idx] = nums1[left]
      idx++, left++
    } else {
      nums[idx] = nums2[right]
      idx++, right++
    }
  }

  // If the left array has remaining elements,
  // add them
  while (left < n1) {
    nums[idx] = nums1[left]
    idx++, left++
  }

  // If the rigth array has remaining elements,
  // add them
  while (right < n2) {
    nums[idx] = nums2[right]
    idx++, right++
  }


  for (let i = 0; i < nums.length; i++) {
    // Modify the first array till all its size
    if (i < n1) {
      nums1[i] = nums[i]!
    }
    // Modify the second array
    else {
      nums2[i - n1] = nums[i]!
    }
  }

  console.log({ nums1, nums2 })
}

const res = brute([1, 3, 5, 7], [0, 2, 6, 8, 9])
