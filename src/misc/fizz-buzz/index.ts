// Give a number n, print the numbers from 1 to n
// If n is divisible by 3 print "Fizz"
// In n is divisible by 5 print "Buzz"
// If n is divisible by both 3 and 5 print "FizzBuzz"

export const fizzBuzz = (n: number): void => {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) console.log("FizzBizz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
};

fizzBuzz(15);
