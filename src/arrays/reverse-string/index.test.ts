import { expect, test, describe } from "bun:test";
import { reverseString } from ".";

describe("reverseString()", () => {
  test("reverses a regular string", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  test("reverses an empty string", () => {
    expect(reverseString("")).toBe("");
  });

  test("reverses a string with spaces", () => {
    expect(reverseString("a b c")).toBe("c b a");
  });

  test("reverses a string with special characters", () => {
    expect(reverseString("!@#$")).toBe("$#@!");
  });

  test("reverses a string with Unicode characters", () => {
    expect(reverseString("🙂🙃")).toBe("🙃🙂");
  });

  test("reverses a palindrome", () => {
    expect(reverseString("madam")).toBe("madam");
  });

  test("reverses a string with numbers", () => {
    expect(reverseString("12345")).toBe("54321");
  });
});
