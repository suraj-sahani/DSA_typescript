import { test, expect, describe } from "bun:test";
import { LinkedList } from ".";

describe("LinkedList", () => {
  test("creates an empty list", () => {
    const list = new LinkedList<number>();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.length).toBe(0);
  });

  test("creates a list with initial value", () => {
    const list = new LinkedList<number>(10);
    expect(list.head?.data).toBe(10);
    expect(list.tail?.data).toBe(10);
    expect(list.length).toBe(1);
  });

  test("push adds elements to the end", () => {
    const list = new LinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.head?.data).toBe(1);
    expect(list.tail?.data).toBe(3);
    expect(list.length).toBe(3);
    expect(list.head?.next?.data).toBe(2);
    expect(list.head?.next?.next?.data).toBe(3);
  });

  test("pop removes the last element", () => {
    const list = new LinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    list.pop();
    expect(list.tail?.data).toBe(2);
    expect(list.length).toBe(2);
    list.pop();
    expect(list.tail?.data).toBe(1);
    expect(list.length).toBe(1);
    list.pop();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.length).toBe(0);
    list.pop(); // should not throw
    expect(list.length).toBe(0);
  });

  test("shift removes the first element", () => {
    const list = new LinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    list.shift();
    expect(list.head?.data).toBe(2);
    expect(list.length).toBe(2);
    list.shift();
    expect(list.head?.data).toBe(3);
    expect(list.length).toBe(1);
    list.shift();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.length).toBe(0);
    list.shift(); // should not throw
    expect(list.length).toBe(0);
  });

  test("unshift adds element to the front", () => {
    const list = new LinkedList<number>();
    list.unshift(5);
    expect(list.head?.data).toBe(5);
    expect(list.tail?.data).toBe(5);
    expect(list.length).toBe(1);
    list.unshift(10);
    expect(list.head?.data).toBe(10);
    expect(list.tail?.data).toBe(5);
    expect(list.length).toBe(2);
    expect(list.head?.next?.data).toBe(5);
  });

  test("getFirst returns the head", () => {
    const list = new LinkedList<number>();
    expect(list.getFirst()).toBeNull();
    list.push(1);
    expect(list.getFirst()?.data).toBe(1);
    list.push(2);
    expect(list.getFirst()?.data).toBe(1);
  });

  test("getLast returns the tail", () => {
    const list = new LinkedList<number>();
    expect(list.getLast()).toBeNull();
    list.push(1);
    expect(list.getLast()?.data).toBe(1);
    list.push(2);
    expect(list.getLast()?.data).toBe(2);
  });

  test("getElementAtIndex returns correct node", () => {
    const list = new LinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.getElementAtIndex(1)?.data).toBe(1);
    expect(list.getElementAtIndex(2)?.data).toBe(2);
    expect(list.getElementAtIndex(3)?.data).toBe(3);
    expect(list.getElementAtIndex(4)).toBeNull();
    expect(list.getElementAtIndex(0)).toBeNull();
  });

  test("setElementAtIndex updates node data", () => {
    const list = new LinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    list.setElementAtIndex(2, 99);
    expect(list.getElementAtIndex(2)?.data).toBe(99);
    list.setElementAtIndex(4, 100); // should not throw
    expect(list.length).toBe(3);
  });

  test("insertAtIndex inserts at head, tail, and middle", () => {
    const list = new LinkedList<number>();
    list.push(1);
    list.push(3);
    list.insertAtIndex(2, 2); // insert in the middle
    expect(list.getElementAtIndex(1)?.data).toBe(1);
    expect(list.getElementAtIndex(2)?.data).toBe(2);
    expect(list.getElementAtIndex(3)?.data).toBe(3);
    expect(list.length).toBe(3);

    list.insertAtIndex(0, 0); // insert at head
    expect(list.getElementAtIndex(1)?.data).toBe(0);
    expect(list.length).toBe(4);

    list.insertAtIndex(4, 4); // insert at tail
    expect(list.getElementAtIndex(5)?.data).toBe(4);
    expect(list.getLast()?.data).toBe(4);
    expect(list.length).toBe(5);
  });
});
