// Question
// 1
// 22
// 333
// 4444
// 55555

// function printP4(n: number) {
//   for (let i = 1; i <= n; i++) {
//     console.log(i.toString().repeat(i));
//   }
// }

function printP4(n: number) {
  let row = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) row += i.toString();
    console.log(row);
    row = "";
  }
}

printP4(5);
