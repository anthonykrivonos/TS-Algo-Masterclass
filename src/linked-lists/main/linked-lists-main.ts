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

      /**
       * Insert
       * - Inserts a node into the linked list at the specified position.
       * - Pushes the node if the index is invalid.
       * @param index Index to insert the node at.
       * @param node Node to insert into the list.
       */
      public insert(index:number, node:MCLinkedListNode<T>):void {
            if (index >= this.size()) {
                  this.push(node);
            } else if (index > 0) {
                  var i = 0;
                  let currentNode = this.head;
                  while (i < index) {
                        i++;
                        currentNode = currentNode.getNext()!;
                  }
                  let tempNext = currentNode.getNext()!;
                  currentNode.setNext(node);
                  node.setNext(tempNext);
            } else if (index == 0) {
                  let tempNext = this.head;
                  node.setNext(this.head);
                  this.head = node;
            }
      }


      /**
       * Push
       * - Pushes a node at the end of the linked list.
       * @param node Node to insert into the list.
       */
      public push(node:MCLinkedListNode<T>):void {
            let currentNode = this.head;
            while (currentNode.hasNext()) {
                  currentNode = currentNode.getNext()!;
            }
            currentNode.setNext(node);
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
       * Set Next
       * - Sets the next node.
       * @param node Node to set the next node to.
       */
      public setNext(node:MCLinkedListNode<T>):void {
            this.next = node;
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
