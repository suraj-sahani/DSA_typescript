// Question

// *****
// ****
// ***
// **
// *

// function printP5(n: number) {
//   for (let i = n; i >= 1; i--) {
//     console.log("*".repeat(i));
//   }
// }

function printP5(n: number) {
  let row = "";
  for (let i = 0; i < n; i++) {
    for (let j = n; j >= i + 1; j--) row += "*";
    console.log(row);
    row = "";
  }
}

printP5(5);
