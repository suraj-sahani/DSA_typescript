// 328. Odd Even Linked List
// Given the head of a singly linked list, 
// group all the nodes with odd indices together 
// followed by the nodes with even indices, and return the reordered list.
//
// The first node is considered odd, and the second node is even, and so on.
//
// Note that the relative order inside both the even and odd groups should remain as it was in the input.
//
// You must solve the problem in O(1) extra space complexity and O(n) time complexity.
//
// Example 1:
//
//
// Input: head = [1,2,3,4,5]
// Output: [1,3,5,2,4]
// Example 2:
//
//
// Input: head = [2,1,3,5,6,4,7]
// Output: [2,3,6,7,1,5,4]
//
//
// Constraints:
//
// The number of nodes in the linked list is in the range [0, 10^4].
// -10^6 <= Node.val <= 10^6

import { Node, SinglyLinkedList } from ".";

// Brute Force Approach
// Iterate over the linked list and store the
// odd and even items in a list.
// Iteration will be done by jumping twice rather than once,
// since we need to get odd and event items
// TC - O(n) : two half iteration for getting odd and even numbers + O(n) : replacing original list data
// SC - O(n)
function brute(head: Node<number> | null): Node<number> | null {
  if (head === null || head.next === null) return head;

  const items: number[] = [];

  // Pass 1: Collect odd-indexed nodes (1st, 3rd, 5th, ...)
  let temp: Node<number> | null = head;
  // Just by doing this, we cannot confirm that we have all the odd
  // indexed elements because for odd length linked list, the last node
  // value will be missed because, the second condition of the while loop
  // i.e temp.next !== null will not be satisfied. Thus, we have to make
  // sure that the last element is taken as well
  while (temp !== null && temp.next !== null) {
    items.push(temp.data);
    temp = temp.next.next;
  }
  if (temp)
    items.push(temp.data)

  // Pass 2: Collect even-indexed nodes (2nd, 4th, 6th, ...)
  temp = head.next;
  while (temp !== null && temp.next !== null) {
    items.push(temp.data);
    temp = temp.next
  }
  if (temp) items.push(temp.data)

  // Pass 3: Overwrite data in the original list
  temp = head;
  let idx = 0;
  while (temp !== null && idx < items.length) {
    temp.data = items[idx++]; // O(1) read instead of O(n) array.shift()
    temp = temp.next;
  }

  return head;
}


// Optimal Approach
// We have to optimize the space, thus this
// gives us the idea of solving it in-place
// We do this by iterating over the linked-list and keeping track
// odd and even node. At each iteration, all we need to do is
// to change the links of the odd and even indexed nodes
// If we look from above, the time complexity is O(n/2)
// This is due to the fact that we have single while loop but since we are doing alternate hops, but, we
// cannot say that it is n/2 as we are also doing the even link change at the same time.
// Thus, TC - O( (n /2) * 2) = O(n)
// SC - O(1)
function optimal(head: Node<number> | null): Node<number> | null {
  if (head === null || head.next === null) return head;

  let oddNode: Node<number> = head;
  let evenNode: Node<number> | null = head.next;
  const evenHead: Node<number> = head.next;

  // Point odd nodes to their respective odd nodes and
  // even nodes to their respective even nodes
  // The condition for which the while loop is run is tricky.
  // We can see that upon arraning the elements, the even nodes
  // stay at the front/after the odd nodes. Thus, if the even node has
  // not reached the end, the odd definitely cannot be at the end
  // So, if I can determine even has not reached the end, we can say
  // that we can keep running the loop
  while (evenNode !== null && evenNode.next !== null) {
    oddNode.next = evenNode.next;
    evenNode.next = evenNode.next.next;

    oddNode = oddNode.next;
    evenNode = evenNode.next;
  }

  // After the above steps, we will have to now change
  // the link of the last odd node to the first even node
  // We can't do this by just ponting oddNode.next to evenNode
  // as the links have to carry the initial values. Thus, before
  // we start the linking, we need to remember the initial
  // odd and even nodes
  oddNode.next = evenHead;

  return head;
}

const ll = SinglyLinkedList.fromArray([1, 2, 3])
const result = new SinglyLinkedList<number>()
result.head = optimal(ll.head)
result.print()
