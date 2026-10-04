// 206. Reverse Linked List
// Given the head of a singly linked list, reverse the list, and return the reversed list.
//
// Example 1:
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
// Example 2:
//
//
// Input: head = [1,2]
// Output: [2,1]
// Example 3:
//
// Input: head = []
// Output: []
//
//
// Constraints:
// The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000

import { DDL, type DNode } from ".";

// Brute Force Approach
// Iterate over the linked-list and store the data in a stack
// Iterate over it a second time to replace the data stored
// in a reverse order from the stack
// TC - O(2n) ~ O(n)
// SC - o(n)
function brute(head: DNode<number> | null) {
  let temp = head;
  const stack = [];

  while (temp !== null) {
    stack.push(temp.data);
    temp = temp.next;
  }

  temp = head;
  while (temp !== null) {
    temp.data = stack.pop()!;
    temp = temp.next;
  }
}

// Optimal Approach
// Reverse the links between the nodes
// TC - O(N)
// SC - O(1)
function optimal(head: DNode<number> | null): DNode<number> | null {
  if (head === null || head.next === null) return head;

  let current: DNode<number> | null = head;
  let newHead: DNode<number> | null = null;

  while (current !== null) {
    // Swap pointers
    const temp = current.prev;
    current.prev = current.next;
    current.next = temp;

    // The node that will become the new head is the last non-null node
    newHead = current;

    // current.prev now holds the old 'next', so this advances forward
    current = current.prev;
  }

  return newHead;
}

const dll = new DDL<number>();
dll.insertAtHead(5);
dll.insertAtHead(4);
dll.insertAtHead(3);
dll.insertAtHead(2);
dll.insertAtHead(1);
dll.print();
dll.head = optimal(dll.head);
dll.print();
