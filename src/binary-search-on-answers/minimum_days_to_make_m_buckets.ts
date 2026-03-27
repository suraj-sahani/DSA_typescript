// 1482. Minimum Number of Days to Make m Bouquets
// Medium
// You are given an integer array bloomDay, an integer m and an integer k.
//
// You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
//
// The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.
//
// Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.
//
//
//
// Example 1:
//
// Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
// Output: 3
// Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
// We need 3 bouquets each should contain 1 flower.
// After day 1: [x, _, _, _, _]   // we can only make one bouquet.
// After day 2: [x, _, _, _, x]   // we can only make two bouquets.
// After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.
// Example 2:
//
// Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
// Output: -1
// Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.
// Example 3:
//
// Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
// Output: 12
// Explanation: We need 2 bouquets each should have 3 flowers.
// Here is the garden after the 7 and 12 days:
// After day 7: [x, x, x, x, _, x, x]
// We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.
// After day 12: [x, x, x, x, x, x, x]
// It is obvious that we can make two bouquets in different ways.
//
//
// Constraints:
//
// bloomDay.length == n
// 1 <= n <= 10^5
// 1 <= bloomDay[i] <= 10^9
// 1 <= m <= 10^6
// 1 <= k <= n

// Brute Force Appraoch
// We can choose a min day to on which a flower could bloom, for e.g : 1
// Then, we iterate over the bloomDays to find all consecutive flowers
// that can be used to make a m bouquet's of size k,
// It is is possible, we return the minDays or,
// if its not possible, we increase the value of minDays and keep trying 
// to see if there is possibility to even make m bouquets.
// One optimization that can be made is that instead of assuming the value of minDay,
// to be 1, we can select the minimum value from bloomDays to find the min day,
// at which a flower has bloomed.
// TC - O(n * (max - min) ), where n is for checking possibility for each iteration
// and (max - min) for ierating from minimum till the maximum value of bloomDays
// SC - O(1)
function brute(bloomDays: number[], m: number, k: number) {

  // Check if its event possible to generate required bouqets based on 
  // number of flowers available
  if ((m * k) > bloomDays.length) return -1

  const minBloomDay = Math.min(...bloomDays)
  const maxBloomDay = Math.max(...bloomDays)

  // Iterate over all possible bloomDays and check 
  // for each value if we can generate the required amount of bouquets.
  for (let i = minBloomDay; i <= maxBloomDay; i++) {
    const isBouquetPossible = checkBouquetPossibility(i, bloomDays, m, k)

    // Since we searching linearly, if a bouquet is possible,
    // we return since we need the minimum value
    if (isBouquetPossible) {
      return i
    }
  }

  // return -1 if making bouquets is not possible
  return -1
}


// Optimal Appraoch
// From the brute force approach, we can clearly see that we know
// the range of the answer, thus, we use binary search on answers.
// TC - (log(max - min) * n),
// SC - O(1)
function optimal(bloomDays: number[], m: number, k: number) {
  if ((m * k) > bloomDays.length) return -1

  let low = Math.min(...bloomDays), high = Math.max(...bloomDays), mid, minDay = -1

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2)

    const isBouquetPossible = checkBouquetPossibility(mid, bloomDays, m, k)

    // If there is a possibility of making the required amount of bouquets at the mid value,
    // them we might have out answers, but, we need the minimum
    // and since the rnage is sorted, we remove the right half 
    if (isBouquetPossible) {
      minDay = mid
      high = mid - 1
    }
    // if its not possible for the mid value, then there is no way that the previous values
    // will give us the required bouquets, thus we remove the left half.
    else {
      low = mid + 1
    }
  }

  return minDay
}

function checkBouquetPossibility(day: number, bloomDays: number[], m: number, k: number) {
  const n = bloomDays.length

  let consecutiveCount = 0, bouquetCount = 0;

  for (let i = 0; i < n; i++) {
    // Check if the current value of day >= bloomDays[i]
    // if it is, then this flower has bloomed and can be used to make a bouquet
    // We increase the consecutive count.
    if (day >= bloomDays[i]!) {
      consecutiveCount++
    }

    // If the current minDay value is less, the consecutiveCount is reset 
    // and we find the number of bouquets that can be made from the consecutive bloomed flowers.
    else {
      bouquetCount += Math.floor(consecutiveCount / k)
      consecutiveCount = 0
    }

  }
  // This is a fallback check for trailing consequtive bloomed flowers
  bouquetCount += Math.floor(consecutiveCount / k)

  // Check if the total bouquetCount >= m,
  if (bouquetCount >= m) return true

  // Return false if it does not
  return false

}

const res = optimal([7, 7, 7, 7, 12, 7, 7], 2, 3)
console.log(res)
