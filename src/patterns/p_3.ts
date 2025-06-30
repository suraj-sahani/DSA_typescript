// Question
// 1
// 12
// 123
// 1234
// 12345

function printP3(lineCount: number) {
  let row = "";
  for (let i = 0; i < lineCount; i++) {
    for (let j = 0; j <= i; j++) {
      row += (j + 1).toString();
    }
    console.log(row);
    row = "";
  }
}

printP3(5);
