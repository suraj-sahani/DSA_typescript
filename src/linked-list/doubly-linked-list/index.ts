export class DNode<T> {
  data: T;
  next: DNode<T> | null;
  prev: DNode<T> | null;

  constructor(
    data: T,
    next: DNode<T> | null = null,
    prev: DNode<T> | null = null,
  ) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

export class DoublyLinkedList<T> {
  head: DNode<T> | null = null;
  tail: DNode<T> | null = null;

  /**
   * Static factory method: constructs a list from an array in O(n) time.
   */
  static fromArray<T>(arr: T[]): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>();
    if (arr.length === 0) return list;

    list.head = new DNode(arr[0]);
    let current = list.head;

    for (let i = 1; i < arr.length; i++) {
      const newNode = new DNode(arr[i], null, current);
      current.next = newNode;
      current = newNode;
    }

    list.tail = current;
    return list;
  }

  insertAtHead(val: T): void {
    const newNode = new DNode(val, this.head, null);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.head.prev = newNode;
    this.head = newNode;
  }

  insertAtTail(val: T): void {
    const newNode = new DNode(val, null, this.tail);

    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }

  insertAtIndex(index: number, val: T): void {
    if (index < 0) throw new Error("Index cannot be negative");

    if (index === 0) {
      this.insertAtHead(val);
      return;
    }

    let temp: DNode<T> | null = this.head;
    let currentIndex = 0;

    // Traverse to the node currently occupying the target index
    while (temp !== null && currentIndex < index) {
      temp = temp.next;
      currentIndex++;
    }

    // If temp is null and we reached the exact next index, insert at tail
    if (temp === null) {
      if (currentIndex === index) {
        this.insertAtTail(val);
        return;
      }
      throw new Error("Index out of bounds");
    }

    // Insert before temp
    const prevNode = temp.prev!;
    const newNode = new DNode(val, temp, prevNode);
    prevNode.next = newNode;
    temp.prev = newNode;
  }

  deleteHead(): void {
    if (this.head === null) return;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    this.head = this.head.next;
    if (this.head !== null) {
      this.head.prev = null;
    }
  }

  deleteTail(): void {
    if (this.tail === null) return;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    this.tail = this.tail.prev;
    if (this.tail !== null) {
      this.tail.next = null;
    }
  }

  deleteAtIndex(index: number): void {
    if (this.head === null || index < 0) return;

    if (index === 0) {
      this.deleteHead();
      return;
    }

    let temp: DNode<T> | null = this.head;
    let currentIndex = 0;

    while (temp !== null && currentIndex < index) {
      temp = temp.next;
      currentIndex++;
    }

    if (temp === null) return;

    if (temp === this.tail) {
      this.deleteTail();
      return;
    }

    const prevNode = temp.prev!;
    const nextNode = temp.next!;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  /**
   * Forward print representing a doubly linked list's bidirectional flow.
   * Format: null <-> [ 10 ] <-> [ 20 ] <-> [ 30 ] <-> null
   */
  print(): void {
    if (this.head === null) {
      console.log("null");
      return;
    }

    const elements: string[] = [];
    let current: DNode<T> | null = this.head;

    while (current !== null) {
      elements.push(`[ ${String(current.data)} ]`);
      current = current.next;
    }

    console.log(`null <-> ${elements.join(" <-> ")} <-> null`);
  }

  /**
   * Reverse print demonstrating backward traversal via prev pointers.
   */
  printReverse(): void {
    if (this.tail === null) {
      console.log("null");
      return;
    }

    const elements: string[] = [];
    let current: DNode<T> | null = this.tail;

    while (current !== null) {
      elements.push(`[ ${String(current.data)} ]`);
      current = current.prev;
    }

    console.log(`null <-> ${elements.join(" <-> ")} <-> null`);
  }
}

// --- Execution & Demo ---
(() => {
  const dll = DoublyLinkedList.fromArray([2, 5, 0, 12, 8]);
  console.log("Constructed from array:");
  dll.print(); // null <-> [ 2 ] <-> [ 5 ] <-> [ 0 ] <-> [ 12 ] <-> [ 8 ] <-> null

  dll.deleteAtIndex(2);
  console.log("\nAfter deleting index 2:");
  dll.print(); // null <-> [ 2 ] <-> [ 5 ] <-> [ 12 ] <-> [ 8 ] <-> null

  dll.insertAtHead(99);
  dll.insertAtTail(100);
  console.log("\nAfter inserting head (99) and tail (100):");
  dll.print(); // null <-> [ 99 ] <-> [ 2 ] <-> [ 5 ] <-> [ 12 ] <-> [ 8 ] <-> [ 100 ] <-> null

  console.log("\nReverse traversal:");
  dll.printReverse(); // null <-> [ 100 ] <-> [ 8 ] <-> [ 12 ] <-> [ 5 ] <-> [ 2 ] <-> [ 99 ] <-> null
})();
