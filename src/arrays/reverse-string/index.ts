// Write a program to reverse a string
// Input : "Join"
// Output : "nioJ"

// Using in-built javascript functions.

// export const reverseString = (s: string) => s.split("").reverse().join("");

// export const reverseString = (s: string) => {
//   const result: string[] = [];

//   for (let i = s.length - 1; i >= 0; i--) {
//     result.push(s[i]!);
//   }

//   return result.join("");
// };

// Note : This implementation only works for normal strings and for for unicode strings.
// To make it work for unicode strings we create a copy using the Array.from() method to create an array of characters instead of split.

// export const reverseString = (s: string) => Array.from(s).reverse().join("");

export const reverseString = (s: string) => {
  const copyStr = Array.from(s);
  const result: string[] = [];

  for (let i = copyStr.length - 1; i >= 0; i--) {
    result.push(copyStr[i]!);
  }

  return result.join("");
};

const result = reverseString("Join");
console.log(result);
