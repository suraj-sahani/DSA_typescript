import { expect, test, describe, spyOn, beforeEach, afterEach } from "bun:test";
import { fizzBuzz } from "./index";

describe("fizzBuzz", () => {
  let consoleLogSpy: any;

  beforeEach(() => {
    consoleLogSpy = spyOn(console, "log");
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test("handles numbers from 1 to 15", () => {
    fizzBuzz(15);

    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 1);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 2);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, "Fizz");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 4);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(5, "Buzz");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(6, "Fizz");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(10, "Buzz");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(15, "FizzBizz");
  });

  test("handles single digit input", () => {
    fizzBuzz(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(1);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  });

  test("handles zero input", () => {
    fizzBuzz(0);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test("handles negative input", () => {
    fizzBuzz(-5);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});
