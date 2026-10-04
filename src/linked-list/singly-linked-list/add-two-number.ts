// 2. Add Two Numbers
// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
//
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
//
//
//
// Example 1:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:
//
// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:
//
// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]
//
//
// Constraints:
//
// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

import { Node, SinglyLinkedList } from ".";

// Approach - Since the numbers are given in reverse order,
// we can just iterate over the numbers, add them and create a node
// for the sum, keep track of the carry until it can
// be put into a new node
// TC - O( max(n1, n2) )
// SC - O( max(n1, n2) )
function addTwoNumberLl(h1: Node<number> | null, h2: Node<number> | null) {
  let carry = 0, dNode = new Node(-1), curr = dNode, temp1 = h1, temp2 = h2

  while (temp1 !== null || temp2 !== null) {
    // Calculate sum of numbers from both linked lists
    let sum = carry

    if (temp1 !== null) {
      sum += temp1.data
      temp1 = temp1.next
    }

    if (temp2 !== null) {
      sum += temp2.data
      temp2 = temp2.next
    }
    // Create a new node in the sum list
    const newSumListNode = new Node(sum % 10)
    // Update carry
    carry = Math.floor(sum / 10)

    curr.next = newSumListNode
    curr = curr.next

  }

  // Edge case where, there might be a carry.
  if (carry) {
    const newSumListNode = new Node(carry)
    curr.next = newSumListNode
  }

  return dNode.next
}

const ll1 = SinglyLinkedList.fromArray([1, 2])
const ll2 = SinglyLinkedList.fromArray([9, 9, 9, 9])
const resultLinkedList = new SinglyLinkedList<number>()
resultLinkedList.head = addTwoNumberLl(ll1.head, ll2.head)
resultLinkedList.print()

