// 1011. Capacity To Ship Packages Within D Days
// Medium
// A conveyor belt has packages that must be shipped from one port to another within days days.
//
// The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.
//
// Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.
//
// Example 1:
//
// Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
// Output: 15
// Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
// 1st day: 1, 2, 3, 4, 5
// 2nd day: 6, 7
// 3rd day: 8
// 4th day: 9
// 5th day: 10
//
// Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.
// Example 2:
//
// Input: weights = [3,2,2,4,1,4], days = 3
// Output: 6
// Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
// 1st day: 3, 2
// 2nd day: 2, 4
// 3rd day: 1, 4
// Example 3:
//
// Input: weights = [1,2,3,1,1], days = 4
// Output: 3
// Explanation:
// 1st day: 1
// 2nd day: 2
// 3rd day: 3
// 4th day: 1, 1
//
//
// Constraints:
//
// 1 <= days <= weights.length <= 5 * 10^4
// 1 <= weights[i] <= 500

// Brute Force Approach
// We can start ietrating the minimum amount and check for each
// value of the minimum amount to see if all the packages can be 
// transported in "d" days. If it is, that is the minimum amount.
// One observation is that since we have to transport one package each day,
// then the ship should have the minimum capacity of the heaviest package that it needs
// to transport.

function brute(weights: number[], days: number) {
  const minW = Math.max(...weights), maxW = weights.reduce((acc, val) => acc + val, 0)

  for (let i = minW; i <= maxW; i++) {
    const reqDays = findRequiredDays(i, weights)

    if (reqDays <= days) return i
  }

  return -1
}

function findRequiredDays(currShipCapacity: number, weights: number[]) {
  // Approach is that we keep ietrating over weights and
  // adding up weights[i] until it exceeds the "curr" value.
  // If it does, we increment days.
  // At last if the reqDays exceeds the given days, i.e the curr 
  // is not the value at which we can transport packages to match the criteria
  let reqDays = 1, load = 0;
  const n = weights.length

  for (let i = 0; i < n; i++) {
    // We initially check that if the currentWeigh + previous load value
    // exceeps the spis capacity, we need to increment the req days 
    // at the same time, we need to reset the load to the exceeding unit as 
    // if we keep track if the load for the current day does not exceed the 
    // current ships capacity
    if (load + weights[i]! > currShipCapacity) {
      reqDays++;
      load = weights[i]!
    }
    // If it does not, we keep increasing the load for the day
    else {
      load += weights[i]!
    }
  }

  return reqDays
}

const res = brute([3, 2, 2, 4, 1, 4], 3)
console.log(res)
