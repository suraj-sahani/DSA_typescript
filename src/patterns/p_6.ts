// Question

// 12345
// 1234
// 123
// 12
// 1

function printP6(n: number) {
  let row = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      row += (j + 1).toString();
    }
    console.log(row);
    row = "";
  }
}

printP6(5);
