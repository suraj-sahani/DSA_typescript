export class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.data = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor(value?: T) {
    this.head = value ? new Node(value) : null;
    this.tail = this.head;
    this.length = value ? 1 : 0;
  }

  push(value: T) {
    const nodeToBeAdded = new Node(value);

    // Edge case where the linked-list is enmty and has both the head and tail pointing to null;
    // In this case, point both the head and tail to the pushed node.
    if (!this.head) {
      this.head = nodeToBeAdded;
      this.tail = nodeToBeAdded;
      this.length = 1;
      return;
    }
    // If there is head, check if there's a tail that also exists
    // Create a new node
    // Point the tail's next to the new node
    else {
      if (this.tail) {
        this.tail.next = nodeToBeAdded;
        this.tail = nodeToBeAdded;
        this.length++;
      }
    }
  }

  pop() {
    // If there are no elements, return
    if (!this.head) return;
    let prev = this.head,
      current = this.head;

    // Edge Case:
    // If there is only one element in the linked list, delete it and set the head and tail to null;
    if (!this.head.next) {
      this.head = this.tail = null;
      this.length--;
      return;
    }

    // Iterate over the linked-list until we reach the end while keeping track of the previous node
    // Once we reach the end node, the prev node becomes the tail.
    // Update the tail

    while (current.next) {
      prev = current;
      current = current.next;
    }

    if (this.tail) {
      this.tail = prev;
      this.tail.next = null;
      this.length--;
    }
  }

  shift() {
    // if there are no elements, return
    if (!this.head) return;

    // If there is only one element(i.e there is no next element for the head), reset the linked-list's head and tail to null;
    if (!this.head.next) {
      this.head = this.tail = null;
      this.length--;
    }
    // if there are more than one element's in the linked-list, just more the head to the next node.
    else {
      this.head = this.head.next;
      this.length--;
    }
  }

  unshift(value: T) {
    const newNode = new Node(value);

    // If there are no elements in the linked-list, after setting the head, set the tail as the head as well
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    return this.tail;
  }

  getElementAtIndex(index: number) {
    if (index > this.length || index === 0) return null;
    let current = this.head;
    let i = 1;
    while (i++ < index && current) {
      current = current?.next;
    }

    return current;
  }

  setElementAtIndex(index: number, value: T) {
    const nodeToBeSet = this.getElementAtIndex(index);
    if (nodeToBeSet) {
      nodeToBeSet.data = value;
    }
  }

  insertAtIndex(index: number, value: T) {
    if (index === 0) {
      this.unshift(value);
      return;
    }
    if (index === this.length && index !== 2) {
      this.push(value);
      return;
    }

    // Use the existing getElementAtIndex method to get the element before the index where the new value should be inserted
    const prevNode = this.getElementAtIndex(index - 1);
    // The prevNode will always have a next element since it is an element present in between the head and the tail.
    // Since typescript is not aware of this fact, we check not not null
    if (prevNode && prevNode.next) {
      const newNode = new Node(value);
      newNode.next = prevNode.next;
      prevNode.next = newNode;
      this.length++;
    }
  }

  deleteAtIndex(index: number) {
    let current = this.head;
    if (index === 1) {
      this.shift();
      return;
    }

    if (index === this.length) {
      this.pop();
      return;
    }

    const prevNode = this.getElementAtIndex(index - 1);
    const nodeToBeDeleted = this.getElementAtIndex(index);
    if (prevNode && nodeToBeDeleted) {
      prevNode.next = nodeToBeDeleted.next;
      this.length--;
    }
  }
}

const myLinkedList = new LinkedList<number>();
myLinkedList.push(1);
myLinkedList.push(3);
myLinkedList.push(5);
myLinkedList.push(7);

// myLinkedList.pop();

// myLinkedList.shift();

// myLinkedList.unshift(9);

// console.log("Last Element", myLinkedList.getLast());
// console.log("First Element", myLinkedList.getFirst());
// console.log("Element at index:", myLinkedList.getElementAtIndex(0));

// myLinkedList.insertAtIndex(2, 2);
myLinkedList.deleteAtIndex(3);
// myLinkedList.setElementAtIndex(2, 0);
console.dir(myLinkedList, { depth: null });
