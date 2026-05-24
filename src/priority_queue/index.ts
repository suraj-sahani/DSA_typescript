/**
 * Represents a single node in the Priority Queue.
 */
interface PriorityNode<T> {
  element: T;
  priority: number;
}

/**
 * A Priority Queue implementation using a Binary Heap.
 * T: The type of elements stored in the queue.
 */
export class PriorityQueue<T> {
  private heap: PriorityNode<T>[] = [];

  /**
   * @param compareFn A custom comparator. 
   * Default is a Min-Heap (smaller priority numbers are handled first).
   * For a Max-Heap, use: (a, b) => a > b
   */
  constructor(
    private compareFn: (a: number, b: number) => boolean = (a, b) => a < b
  ) { }

  // --- Public API ---

  /**
   * Adds an element to the queue with a specific priority.
   */
  enqueue(element: T, priority: number): void {
    const newNode: PriorityNode<T> = { element, priority };
    this.heap.push(newNode);
    this.siftUp(this.heap.length - 1);
  }

  /**
   * Removes and returns the element with the highest priority.
   * Returns undefined if the queue is empty.
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop();

    if (!root) return undefined;

    if (this.heap.length > 0 && last) {
      this.heap[0] = last;
      this.siftDown(0);
    }

    return root.element;
  }
  /**
   * Returns the highest priority element without removing it.
   */
  peek(): T | undefined {
    const root = this.heap[0];
    return root ? root.element : undefined;
  }
  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  clear(): void {
    this.heap = [];
  }

  // --- Internal Helper Methods ---

  private getParentIndex(i: number): number { return Math.floor((i - 1) / 2); }
  private getLeftChildIndex(i: number): number { return 2 * i + 1; }
  private getRightChildIndex(i: number): number { return 2 * i + 2; }

  private swap(i: number, j: number): void {
    const nodeI = this.heap[i];
    const nodeJ = this.heap[j];

    // If both exist, perform the swap
    if (nodeI && nodeJ) {
      this.heap[i] = nodeJ;
      this.heap[j] = nodeI;
    }
  }
  /**
   * Moves an element up the tree to restore heap property.
   */
  private siftUp(index: number): void {
    let currentIndex = index;

    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      const node = this.heap[currentIndex];
      const parent = this.heap[parentIndex];

      // Type Guard: Ensure both exist (though logic-wise currentIndex > 0 guarantees parent)
      if (node && parent && this.compareFn(node.priority, parent.priority)) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }
  /**
   * Moves an element down the tree to restore heap property.
   */
  private siftDown(index: number): void {
    let currentIndex = index;
    const length = this.heap.length;

    while (true) {
      let left = this.getLeftChildIndex(currentIndex);
      let right = this.getRightChildIndex(currentIndex);
      let swapIndex: number | null = null;

      const currentNode = this.heap[currentIndex];
      if (!currentNode) break; // Safety break

      // Check left child
      if (left < length) {
        const leftNode = this.heap[left];
        if (leftNode && this.compareFn(leftNode.priority, currentNode.priority)) {
          swapIndex = left;
        }
      }

      // Check right child
      if (right < length) {
        const rightNode = this.heap[right];
        const comparisonNode = swapIndex === null ? currentNode : this.heap[left];

        if (rightNode && comparisonNode && this.compareFn(rightNode.priority, comparisonNode.priority)) {
          swapIndex = right;
        }
      }

      if (swapIndex === null) break;

      this.swap(currentIndex, swapIndex);
      currentIndex = swapIndex;
    }
  }
}
