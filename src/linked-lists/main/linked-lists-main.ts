/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.01.2018
 * Linked Lists/Main
 */

/**
 * Masterclass linked list implementation.
 */
export class MCLinkedList<T> {

      private head:MCLinkedListNode<T>;

      /**
       * Constructor
       * - Creates an MCMap from a regular map.
       * @param map Optional map to reconstruct.
       */
      constructor(head:MCLinkedListNode<T>) {
            this.head = head;
      }

      /**
       * Size
       * - Get the size of the linked list.
       * @returns The size of the list.
       */
      public size():number {
            var size = 1;
            let node = this.head;
            while (node.hasNext()) {
                  size++;
                  node = node.getNext()!;
            }
            return size;
      }

      /**
       * Size - Recursive
       * - Get the size of the linked list.
       * @returns The size of the list.
       */
      public sizeRecursive(node:MCLinkedListNode<T> | null = this.head):number {
            if (node) {
                  return 1 + this.sizeRecursive(node.getNext());
            }
            return 0;
      }

}

/**
 * Masterclass linked list node.
 */
export class MCLinkedListNode<T> {

      private value:T;
      private next:MCLinkedListNode<T> | null;

      /**
       * Constructor
       * - Creates an MCMap from a regular map.
       * @param map Optional map to reconstruct.
       */
      constructor(value:T, next:MCLinkedListNode<T> | null = null) {
            this.value = value;
            this.next = next;
      }

      /**
       * Get Value
       * - Gets the value of the node.
       * @returns Returns the value.
       */
      public getValue():T {
            return this.value;
      }

      /**
       * Get Next
       * - Gets the next node.
       * @returns Returns the next node.
       */
      public getNext():MCLinkedListNode<T> | null {
            return this.next;
      }

      /**
       * Has Next
       * - Checks for the next node.
       * @returns Returns true if the linked list node has next node.
       */
      public hasNext():boolean {
            return this.next != null;
      }

}
