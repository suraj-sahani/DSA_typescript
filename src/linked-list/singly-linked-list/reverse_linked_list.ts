// 206. Reverse Linked List
// Given the head of a singly linked list, reverse the list, and return the reversed list.
//
//
//
// Example 1:
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
//
// Example 2:
// Input: head = [1,2]
// Output: [2,1]
//
// Example 3:
// Input: head = []
// Output: []
//
// Constraints:
//
// The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000

import { SinglyLinkedList, Node } from ".";

// Brute Force Approach
// Iterate over the linked list and store data in
// an array.
// Then just replace the data in the original linked
// list with the array items
// TC - O(2n) ~ O(n)
// SC - O(1)
function brute<T>(head: Node<T> | null) {
  if (head === null) return;

  let temp: Node<T> | null = head;
  const listItems: T[] = [];

  // Traverse and put it into a stack
  while (temp !== null) {
    listItems.push(temp.data);
    temp = temp.next;
  }

  temp = head;

  // Replace existing linked list items with the items
  // in the stack
  while (temp !== null) {
    const item = listItems.pop();

    if (!item) break;
    temp.data = item;
    temp = temp.next;
  }
}

// Optimal Approach
// We cannot use additional space, instead we will have
// to change the links
// Approach is simple, for any iteration, the current node
// will have a next node and a previous node.
// All we need to do is to reverse the pointers to the nodes
function optimal<T>(head: Node<T> | null): Node<T> | null {
  if (head === null || head.next === null) return head;

  let temp: Node<T> | null = head,
    prev: Node<T> | null = null;

  while (temp !== null) {
    // Since we are reversing the links, the first
    // step would be to store the reference/pointers to all the
    // next nodes.
    let nextNode: Node<T> | null = temp.next;
    // Point the next of the current node to the previous node
    temp.next = prev;
    // Update the prev to the current node
    prev = temp;
    // Move the current node to the next node
    temp = nextNode;
  }

  return prev;
}

const ll = SinglyLinkedList.fromArray([1, 2, 3, 4, 5]);
ll.print();
const result = new SinglyLinkedList();
result.head = optimal(ll.head);
result.print();
