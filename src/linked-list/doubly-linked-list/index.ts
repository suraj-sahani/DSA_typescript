export class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

export class SinglyLinkedList<T> {
  head: Node<T> | null = null;

  /**
   * Static factory method: constructs a list from an array in O(n) time.
   */
  static fromArray<T>(arr: T[]): SinglyLinkedList<T> {
    const list = new SinglyLinkedList<T>();
    if (arr.length === 0) return list;

    list.head = new Node(arr[0]);
    let tail = list.head;

    for (let i = 1; i < arr.length; i++) {
      tail.next = new Node(arr[i]);
      tail = tail.next;
    }

    return list;
  }

  insertAtHead(val: T): void {
    this.head = new Node(val, this.head);
  }

  insertAtTail(val: T): void {
    if (this.head === null) {
      this.head = new Node(val);
      return;
    }

    let temp = this.head;
    while (temp.next !== null) {
      temp = temp.next;
    }

    temp.next = new Node(val);
  }

  insertAtIndex(index: number, val: T): void {
    if (index < 0) throw new Error("Index cannot be negative");

    if (index === 0) {
      this.insertAtHead(val);
      return;
    }

    let temp: Node<T> | null = this.head;
    let currentIndex = 0;

    // Traverse to the node immediately before the target index
    while (temp !== null && currentIndex < index - 1) {
      temp = temp.next;
      currentIndex++;
    }

    if (temp === null) {
      throw new Error("Index out of bounds");
    }

    temp.next = new Node(val, temp.next);
  }

  deleteHead(): void {
    if (this.head === null) return;
    this.head = this.head.next;
  }

  deleteTail(): void {
    if (this.head === null) return;

    if (this.head.next === null) {
      this.head = null;
      return;
    }

    let temp = this.head;
    while (temp.next !== null && temp.next.next !== null) {
      temp = temp.next;
    }

    temp.next = null;
  }

  deleteAtIndex(index: number): void {
    if (this.head === null || index < 0) return;

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    let temp: Node<T> | null = this.head;
    let currentIndex = 0;

    while (temp !== null && currentIndex < index - 1) {
      temp = temp.next;
      currentIndex++;
    }

    if (temp === null || temp.next === null) return;

    temp.next = temp.next.next;
  }

  /**
   * Visual print representing a singly linked list's unidirectional flow.
   * Format: [ 10 ] -> [ 20 ] -> [ 30 ] -> null
   */
  print(): void {
    if (this.head === null) {
      console.log("null");
      return;
    }

    const elements: string[] = [];
    let current: Node<T> | null = this.head;

    while (current !== null) {
      elements.push(`[ ${String(current.data)} ]`);
      current = current.next;
    }

    console.log(`${elements.join(" -> ")} -> null`);
  }
}

// --- Execution & Demo ---
(() => {
  // 1. Create directly from array
  const ll = SinglyLinkedList.fromArray([2, 5, 0, 12, 8]);
  console.log("Constructed from array:");
  ll.print(); // [ 2 ] -> [ 5 ] -> [ 0 ] -> [ 12 ] -> [ 8 ] -> null

  // 2. Modify elements
  ll.deleteAtIndex(2); // deletes 0 at index 2
  console.log("\nAfter deleting index 2:");
  ll.print(); // [ 2 ] -> [ 5 ] -> [ 12 ] -> [ 8 ] -> null

  ll.insertAtHead(99);
  ll.insertAtTail(100);
  console.log("\nAfter inserting head (99) and tail (100):");
  ll.print(); // [ 99 ] -> [ 2 ] -> [ 5 ] -> [ 12 ] -> [ 8 ] -> [ 100 ] -> null
})();
