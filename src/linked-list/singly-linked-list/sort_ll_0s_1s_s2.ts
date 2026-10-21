import { Node, SinglyLinkedList } from ".";
// Sort a Linked List of 0s, 1s and 2s by Changing Links
// Given the head of a singly linked list,
// where every node contains only 0, 1, or 2, sort the linked list in non-decreasing order.
//
// Return the head of the sorted linked list.
// Linked list examples appear in array form for compact representation.
//
// Example 1
// Input: [1, 2, 0, 1, 2, 0, 1]
// Output: [0, 0, 1, 1, 1, 2, 2]
// Explanation: All 0 values move to the front, followed by all 1 values, followed by all 2 values.
//
// Example 2
// Input: [2, 2, 1, 0]
// Output: [0, 1, 2, 2]

// Brute Force Approach
// Iterate over the linked list and keep track of the
// counts of 0, 1 and 2
// Do a second iteration over the linked list and update the data
// while keeping check of the 0, 1 and 2's counts
// TC - O(2n)
// SC - O(1)
function brute(head: Node<number> | null) {
  let zeroCount = 0,
    oneCount = 0,
    twoCount = 0;
  let temp = head;

  while (temp !== null) {
    switch (temp.data) {
      case 0:
        zeroCount++;
        break;
      case 1:
        oneCount++;
        break;
      case 2:
        twoCount++;
        break;
      default:
        console.error("Unknown value found");
    }
    temp = temp.next;
  }

  temp = head;

  while (temp !== null) {
    if (zeroCount > 0) {
      temp.data = 0;
      zeroCount--;
    } else if (oneCount > 0) {
      temp.data = 1;
      oneCount--;
    } else {
      temp.data = 2;
      twoCount--;
    }

    temp = temp.next;
  }
}

// Optimal Approach
// We iterate over the linked list while keeping three segregated lists
// for each element. During iteration, we just point the segregated lists nodes
// to the original linked list and do not create any new nodes
// TC - O(n)
// SC - O(1)
function optimal(head: Node<number> | null) {
  if (head === null || head.next === null) return head;

  let temp: Node<number> | null = head;
  let zeroHead = new Node(-1),
    currZero = zeroHead;
  let oneHead = new Node(-1),
    currOne = oneHead;
  let twoHead = new Node(-1),
    currTwo = twoHead;

  while (temp !== null) {
    switch (temp.data) {
      case 0: {
        currZero.next = temp;
        currZero = currZero.next;
        break;
      }
      case 1: {
        currOne.next = temp;
        currOne = currOne.next;
        break;
      }
      case 2: {
        currTwo.next = temp;
        currTwo = currTwo.next;
        break;
      }
      default:
        console.error("Unknown value found");
    }

    temp = temp.next;
  }

  // This step is crucial as now we will be connecting the segregated
  // list to each other but, while connecting we have to make sure that
  // we are connecting to valid lists i.e lists that are not empty
  // Step 1 : Connect the end of the 0's linkeded list to the next valid linked list
  // For this, there can two cases where either we don't have any 1's or any 2's
  // If no 1's are present, in this case, we can will directly point to the 2's
  // linked list.
  // If no 2's are present, pointing it to 2's head -> next will automatically point it
  // to null thereby making everything fall into the correct places
  currZero.next = oneHead.next ? oneHead.next : twoHead.next;
  // Step 2: Connect the end of 1's linked list to the 2's linked list
  // There will again be the case where there might be no 2's, again
  // in this case, we still point it to the 2's head while already points
  // to null making if the correct order
  currOne.next = twoHead.next;
  currTwo.next = null;

  return zeroHead.next;
}

const ll = SinglyLinkedList.fromArray([1, 1, 2, 1, 2, 2, 1]);
ll.print();
const result = new SinglyLinkedList<number>();
result.head = optimal(ll.head);
result.print();
