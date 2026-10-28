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

import { SinglyLinkedList, type Node } from ".";

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

const ll = SinglyLinkedList.fromArray([1, 2, 3, 4, 5]);
ll.print();
brute(ll.head);
ll.print();
