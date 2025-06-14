// Write a program to check if the given string is palindrome or not.
// The string might contain special character like "," , "." ... etc.
// We need to cleanup the string
// T - O(n)
// S - O(n)
const isAlphaNumeric = (char: string): boolean => {
  const asciiValue = char.charCodeAt(0);
  if (
    (asciiValue >= 48 && asciiValue <= 57) || // For numbers 0 - 9
    (asciiValue >= 65 && asciiValue <= 90) || // For Uppercase characters A - Z
    (asciiValue >= 97 && asciiValue <= 122) // For Lowercase characters a - z
  )
    return true;
  return false;
};

// export const checkPalindrome = (s: string): boolean => {
//   const coptStr = Array.from(s);
//   const cleanedString: string[] = [];

//   coptStr.forEach((c) => {
//     if (isAlphaNumeric(c)) cleanedString.push(c.toLowerCase()); // Check each character if its a valid alpham=numeric character.
//     //  If it is push it into the cleaned string in lowercase to prevent mis-match between cases
//   });

//   let i = 0,
//     j = cleanedString.length - 1;
//   while (i < j) {
//     if (cleanedString[i] !== cleanedString[j]) return false;
//     i++;
//     j--;
//   }
//   return true;
// };

// Optmimzation : Not creating a copy of the string
// T - O(n)
// S - O(1)

export const checkPalindrome = (s: string): boolean => {
  let i = 0,
    j = s.length - 1;

  while (i < j) {
    if (i < j && !isAlphaNumeric(s[i]!)) i++;
    if (i < j && !isAlphaNumeric(s[j]!)) j--;

    if (i < j) {
      if (s[i]?.toLowerCase() !== s[j]?.toLowerCase()) return false;
    }
    i++;
    j--;
  }
  return true;
};

const result = checkPalindrome("adam");
console.log(result);
