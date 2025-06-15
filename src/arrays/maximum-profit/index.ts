// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

// Example 2:

// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

// Constraints:

//     1 <= prices.length <= 105
//     0 <= prices[i] <= 104

// Brute Forxe Approach
// Run a nested for loop and keep track of the profit for each iteration.
// If feasible, update the profit in each iteration.
// Return the profit at last.
// T - O(n ^ 2)
// S - O(1)

// export const maximumProfit = (prices: number[]) => {
//   let profit = 0;
//   for (let i = 0; i < prices.length; i++) {
//     for (let j = i + 1; j < prices.length; j++) {
//       if (prices[i]! < prices[j]!)
//         profit = Math.max(profit, prices[j]! - prices[i]!);
//     }
//   }

//   return profit;
// };

// Optimized. Solution
// Keep track of the minimum value seen so far.
// If the current value is greater than the minimum value, update the profit.
// T - O(n)
// S - O(1)

export const maximumProfit = (prices: number[]) => {
  let minPrice = prices[0],
    res = 0;

  if (!minPrice) return;
  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];
    if (!currentPrice) return;

    // Update the minimum value we've seen so far
    minPrice = Math.min(minPrice, currentPrice);

    // Update the profit if the profit has increased
    res = Math.max(res, currentPrice - minPrice);
  }

  return res;
};

const result = maximumProfit([7, 10, 11, 1, 3, 6, 9, 2]);
console.log(result);
