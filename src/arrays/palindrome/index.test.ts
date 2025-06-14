import { describe, test, expect } from "bun:test";
import { checkPalindrome } from ".";

describe("checkPalindrome", () => {
  test("should return true for a simple palindrome", () => {
    expect(checkPalindrome("madam")).toBe(true);
  });

  test("should return true for a palindrome with mixed case", () => {
    expect(checkPalindrome("RaceCar")).toBe(true);
  });

  test("should return true for a palindrome with spaces and punctuation", () => {
    expect(checkPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  test("should return false for a non-palindrome string", () => {
    expect(checkPalindrome("hello")).toBe(false);
  });

  test("should return true for an empty string", () => {
    expect(checkPalindrome("")).toBe(true);
  });

  test("should return true for a single character", () => {
    expect(checkPalindrome("x")).toBe(true);
  });

  test("should return true for numeric palindrome", () => {
    expect(checkPalindrome("12321")).toBe(true);
  });

  test("should return false for numeric non-palindrome", () => {
    expect(checkPalindrome("12345")).toBe(false);
  });
});
