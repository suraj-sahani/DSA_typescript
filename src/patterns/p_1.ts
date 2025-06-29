// Question:
//Print the give pattern:

// *****
// *****
// *****
// *****
// *****

function printP1(startCount: number, lineCount: number) {
  for (let i = 0; i < lineCount; i++) {
    console.log("*".repeat(startCount));
  }
}

printP1(5, 5);
