import { Node, SinglyLinkedList } from ".";

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

const ll = SinglyLinkedList.fromArray([0, 2, 1, 1, 0]);
ll.print();
brute(ll.head);
ll.print();
