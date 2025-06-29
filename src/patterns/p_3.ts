// Question
// 1
// 12
// 123
// 1234
// 12345

function printP3(lineCount: number) {
  let row = "";
  for (let i = 1; i <= lineCount; i++) {
    for (let j = 1; j <= i; j++) {
      row += j.toString();
    }
    console.log(row);
    row = "";
  }
}

printP3(9);
