export class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T, next?: Node<T> | null) {
    this.data = data;
    this.next = next ?? null;
  }
}

export class SinglyLinkedList<T> {
  head: Node<T> | null = null;

  constructor(node: Node<T> | null = null) {
    this.head = node;
  }

  size(): number {
    if (this.head === null) return 0;

    let count = 0,
      temp: Node<T> | null = this.head;

    while (temp !== null) {
      count++;
      temp = temp.next;
    }

    return count;
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
    // temp is structurally guaranteed to be Node<T> here
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

    // Traverse to the node *before* the insertion point
    while (temp !== null && currentIndex < index - 1) {
      temp = temp.next;
      currentIndex++;
    }

    // If temp is null, the index exceeds the list length
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

    // Handle 1-element list deletion
    if (this.head.next === null) {
      this.head = null;
      return;
    }

    let temp = this.head;
    // Type-safe traversal checking ahead
    while (temp.next !== null && temp.next.next !== null) {
      temp = temp.next;
    }

    temp.next = null;
  }

  deleteAtIndex(index: number) {
    // If linked list is empty
    if (this.head === null) return;
    // If we are asked to delete the 1st element
    if (index === 1) {
      this.head = this.head.next;
      return;
    }

    let count = 0,
      temp = this.head,
      prev = this.head;
    while (temp !== null) {
      count++;

      if (count === index) {
        prev.next = prev.next!.next;
        break;
      }
      prev = temp;
      temp = temp.next!;
    }
  }
}
