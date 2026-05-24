/*
 Minimise Maximum Distance between Gas Stations
Hard

Problem Statement: You are given a sorted array ‘arr’ of length ‘n’,
which contains positive integer positions of ‘n’ gas stations on the X-axis. 
You are also given an integer ‘k’. You have to place 'k' 
new gas stations on the X-axis. You can place them anywhere on 
the non-negative side of the X-axis, even on non-integer positions. 
Let 'dist' be the maximum value of the distance between adjacent gas 
stations after adding k new gas stations. Find the minimum value of ‘dist’.

Examples
Example 1:
Input Format: N = 5, arr[] = {1,2,3,4,5}, k = 4
Result: 0.5
Explanation: One of the possible ways to place 4 
gas stations is {1,1.5,2,2.5,3,3.5,4,4.5,5}. Thus the maximum difference 
between adjacent gas stations is 0.5. Hence, the value of ‘dist’ is 0.5. 
It can be shown that there is no possible way to add 4 gas stations 
in such a way that the value of ‘dist’ is lower than this. 

Example 2:
Input Format: N = 10, arr[] = {1,2,3,4,5,6,7,8,9,10}, k = 1
Result: 1
Explanation: One of the possible ways to place 1 gas 
station is {1,1.5,2,3,4,5,6,7,8,9,10}. Thus the maximum difference 
between adjacent gas stations is still 1. Hence, the value of ‘dist’ is 1. 
It can be shown that there is no possible way to add 1 gas station 
in such a way that the value of ‘dist’ is lower than this. 
 */

/* 
Approach for any given array of distances,
arr = [1,7], k = 2, we can start by plaing at the start or the end,
arr = [1,1,1,7] or arr = [1,7, 2,3], for both these cases, if we calculate 
the min distance between two subsequent gas stations, we would min that it would
always be maximum.

Thus, the optimal approach would be to place them in the middle.

Following this, arr = [1, _, _, 7], and the distance between then is 6
and since there are 3(how? 1 => _, _ => _ and _ => 7) spots where we need to minimize the distance,
we can place them ar 6/3 = 2 distance each.

Eg: arr = [1, 13, 17, 23], k = 5
Now, taking all 5 and placing them once will be bigger problem to solve, thus,
we just take one.
Now, if we observe, the greatest distance currently is between 1 => 13 = 12,
thus, we need to place the first element between 1 and 13 so that the 12 is reduced
If we place the item in the muiddle, now arr = [1,7,13,17,23], now, the distance between
adjacent elements it 1 => 7 = 6, 7 => 13 = 6, 13 => 17 = 4, 17 => 23 = 6
Now, we can see the maximum distance is 6 and we need to minimize this,
We can place the second element either between 1 => 7, 7 => 13 or 17 => 23
lets place it between 17 and 23.
now, arr = [1,7,13,17,20,23], the max distance is ow 6 and we need to reduce this,
We can now think that if we place one item between 1 and 7, we are reducing the distance,
but there will still be a ditance of 6 left, i,e between 7 and 13,
thus, ideally what we will do is take the 7 and redistribute them.
How? the distance between the initial elements 1 and 13 is 12, we need to place 2 
elements at equal distance, thus, the distance will be (Difference) / (elements to place + 1)
=> (13 - 1) / (2 + 1) => 12 / 3 = 4
Thus, arr = [1,5,9,13,17,20,23], now, the maximum distance is 4
We can pic k between 13 and 17 and place the 4th element between 5 and 9
arr = [1,5,9,13,15,17,20,23]
Now, for the 5th element, the ma distane is 4 in three places,
1 => 5, 5 => 9 and 9 => 13, we can see if we place at any place between them,
the maximum distance will still be 4 thus, we will redistribute again.
New diff = (13 - 1) / (3 + 1) = 12 / 4 = 3
thus, new arr = [1,4,7,10,13,15,17,20,23]
Once thins is done, we can find the distance between each element 
                         e
The final think to remembr is than we dont need to place items in the array itself,
we just need to know how many elements we are placing between the items.
 */

/*
 Brute Force Approach
 We create an array representing the gaps where we can place an place items,
 We iterate over the gas stations, and keep track of the maximum distance 
 and the index ar which the maximum distance occurs using the array we 
 created to keep track of gaps
 */
function brute(arr: number[], k: number) {
  const n = arr.length;
  const howMany = Array(n - 1).fill(0); // Number of stations in each segment

  // Place k gas stations
  for (let gasStations = 1; gasStations <= k; gasStations++) {
    let maxSection = -1;
    let maxInd = -1;

    // Find the segment with the maximum section length
    for (let i = 0; i < n - 1; i++) {
      let diff = (arr[i + 1] ?? 0) - (arr[i] ?? 0);
      let sectionLength = diff / (howMany[i] + 1);
      if (sectionLength > maxSection) {
        maxSection = sectionLength;
        maxInd = i;
      }
    }

    // Add a gas station in that segment
    howMany[maxInd]++;
  }

  // Final pass to find the maximum section length
  let maxAns = -1;
  for (let i = 0; i < n - 1; i++) {
    let diff = (arr[i + 1] ?? 0) - (arr[i] ?? 0);
    let sectionLength = diff / (howMany[i] + 1);
    maxAns = Math.max(maxAns, sectionLength);
  }

  return maxAns;
}

const res = brute([1, 13, 17, 23], 5)
console.log(res)
