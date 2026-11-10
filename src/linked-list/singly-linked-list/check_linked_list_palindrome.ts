// 234. Palindrome Linked List
// Given the head of a singly linked list,
// return true if it is a palindrome or false otherwise.
//
//
// Example 1:
// Input: head = [1,2,2,1]
// Output: true
//
// Example 2:
// Input: head = [1,2]
// Output: false
//
// Constraints:
//
// The number of nodes in the list is in the range [1, 10^5].
// 0 <= Node.val <= 9

import { SinglyLinkedList, type Node } from ".";

// Brute Force Approach
// Iterate over the linked list and store the items in a Stack
// Do a second iteration while checking the linked list data
// with the top element of the stack
// TC - O(2n) ~ O(n)
// SC - O(n)
function brute<T>(head: Node<T> | null): boolean {
  if (head === null || head.next === null) return true;

  let temp: Node<T> | null = head;
  const arr: T[] = [];

  while (temp != null) {
    arr.push(temp.data);
    temp = temp.next;
  }

  temp = head;

  while (temp != null) {
    const top = arr.pop();
    if (temp.data != top) return false;
    temp = temp.next;
  }

  return true;
}

const ll = SinglyLinkedList.fromArray([1, 2, 2, 3]);
const res = brute(ll.head);
console.log(res);
