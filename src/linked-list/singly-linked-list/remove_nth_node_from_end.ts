// 19. Remove Nth Node From End of List
// Given the head of a linked list, remove the nth node from the end of the list and return its head.
//
// Example 1:
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]
//
// Example 2:
// Input: head = [1], n = 1
// Output: []
//
// Example 3:
// Input: head = [1,2], n = 1
// Output: [1]
//
// Constraints:
//
// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz

import { SinglyLinkedList, type Node } from ".";

// Brute Force Approach
// Iterate through the linked list to find the length
// of the linked list.
// Then iterate again to reach the (k-1)th node
// and point it to the (k+1)th node
// TC - O(2n)
// SC - O(1)
function brute(head: Node<number> | null, size: number, n: number) {
  if (head === null || n <= 0 || n > size) return head;

  const targetIndex = size - n;

  // Case 1: Removing the head node
  if (targetIndex === 0) {
    return head.next;
  }

  // Case 2: Traverse to the node immediately preceding the target
  let temp: Node<number> | null = head;
  for (let i = 0; i < targetIndex - 1; i++) {
    if (temp === null) return head;
    temp = temp.next;
  }

  // Unlink the target node
  if (temp !== null && temp.next !== null) {
    temp.next = temp.next.next;
  }

  return head;
}

// Optimal Approach
// The idea is to first move the fast pointer n steps ahead,
// then move both fast and slow pointers together until fast reaches the end.
// The slow pointer will then be just before the node to be
// removed, allowing to update the next pointer to skip the target node.
// TC - O(n)
// SC - O(1)
function optimal<T>(head: Node<T> | null, n: number): Node<T> | null {
  if (head === null || n <= 0) return head;

  let fast: Node<T> | null = head;
  let slow: Node<T> | null = head;

  // Move fast pointer n steps ahead
  for (let i = 0; i < n; i++) {
    if (fast === null) return head; // n is greater than the length of the list
    fast = fast.next;
  }

  // Edge case: If fast reached null, the node to remove is the head node
  if (fast === null) {
    return head.next;
  }

  // Move both pointers until fast reaches the last node
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow!.next; // Non-null assertion is safe here because slow trails fast
  }

  // Remove the target node
  if (slow !== null && slow.next !== null) {
    slow.next = slow.next.next;
  }

  return head;
}

const ll = SinglyLinkedList.fromArray([1, 2, 3, 4, 5]);
const result = new SinglyLinkedList();
// result.head = brute(ll.head, ll.size(), 5);
result.head = optimal(ll.head, 5);
result.print();
