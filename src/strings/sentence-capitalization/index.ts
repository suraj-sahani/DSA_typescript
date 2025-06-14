// Given a sentence, return the sentence with the first letter of each word capitalized.

export const capitalizeFirstWord = (str: string): string => {
  const splitSentence = str.split(" ");

  return splitSentence
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const result = capitalizeFirstWord("hello world");
console.log(result);
