// Aggressive Cows
// You are given an array with unique elements of stalls[],
// which denote the positions of stalls.You are also given an
// integer k which denotes the number of aggressive cows.
// The task is to assign stalls to k cows such that the minimum
// distance between any two of them is the maximum possible.

// Examples:

// Input: stalls[] = [1, 2, 4, 8, 9], k = 3
// Output: 3
// Explanation: The first cow can be placed at stalls[0],
// the second cow can be placed at stalls[2] and
// the third cow can be placed at stalls[3].
// The minimum distance between cows in this case is 3, which is the largest among all possible ways.
// Input: stalls[] = [10, 1, 2, 7, 5], k = 3
// Output: 4
// Explanation: The first cow can be placed at stalls[0],
// the second cow can be placed at stalls[1] and
// the third cow can be placed at stalls[4].
// The minimum distance between cows in this case is 4, which is the largest among all possible ways.
// Input: stalls[] = [2, 12, 11, 3, 26, 7], k = 5
// Output: 1
// Explanation: There are 6 stalls and only 5 cows, we
// try to place the cows such that the minimum distance between any two cows is as large as possible.
// The minimum distance between cows in this case is 1, which is the largest among all possible ways.
// Constraints:
// 2 ≤ stalls.size() ≤ 10^6
// 0 ≤ stalls[i] ≤ 10^8
// 2 ≤ k ≤ stalls.size()

// Brute Force Approach
// We are given an array of stalls, where stalls[i] is
// the coordinate at which the stall lies
// So, eg: stalls = [10,1,2,4,5], the first stall is at coordinate 10, the next at 1 and so on.
// Our task is to place "k" cows at any of the stall in a way
// such that the minimum distance between 2 cows is the maximum
// The appraoch will be to find all combinations in which, k cows can be placed,
// For each combination, take the minimum distance between two cows and keep track of it
// Continue to do this and after each combination, take the max value
// For eg, if the minimum distance for C1 = 1, take this
// For C2, min distance is 4, take the max between the combinations i.e 4

// First thing we need to do is sort the stalls array. Why?
// The question states the we need to find the minimum distance between two cows for a combination.
// We can be sure that the minimum will always happen between consequtive stalls
// i.e if stalls = [10,1,2,5,7]
// sorted stalls = [1,2,5,7,10], now, if we take the the first two stalls
// that are now consecutive due to the sorting and place a cow at each index,
// the distance between them = 2 - 1 => 1, this will result the minimum.
// Now, how we will find the maximum value
// We can see that the minimum distance between 2 cows is 1
// What is the maximum value then, we can say that its max_coord - min_coord
// Thus, we will iterate from [1, max - min], this will be the min distance
// and at every iteration, we will see if for the distance "d", we can place "k" cows,
// Since we are iterating from [1,max-min], if will automatically give us the max values between the min
// diatance between 2 cows.

function brute(stalls: number[], k: number) {
  const sortedStall = stalls.sort((a, b) => a - b);
  const n = sortedStall.length,
    min = sortedStall[0]!,
    max = sortedStall[n - 1]!;

  for (let i = min; i <= max; i++) {
    if (!canPlaceCows(sortedStall, i, k)) return i - 1;
  }
}

function canPlaceCows(stalls: number[], minDistance: number, cows: number) {
  const n = stalls.length;
  // We intialize count as 1 as we always place a cow on the first coordinate => Greedy Approach
  // And since the first cow will be placed at the first stall, we  initialized the lastCowCoord with the first index
  let count = 1,
    lastCowCoord = stalls[0]!;
  for (let i = 1; i < n; i++) {
    // We check if the distance between the current coordinate and the lastCowCoord is greater than the theoritial min distance,
    // then we have placed one more cow, we increate the cows placed count and update the lastCowCoords
    if (stalls[i]! - lastCowCoord >= minDistance) {
      count++;
      lastCowCoord = stalls[i]!;
    }
  }

  if (count >= cows) return true;
  return false;
}

const res = brute([10, 1, 2, 7, 5], 3);
console.log(res);
