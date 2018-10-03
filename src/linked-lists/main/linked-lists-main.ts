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
       * TODO: - Test
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
       * TODO: - Test
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
       * TODO: - Test
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
       * TODO: - Test
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



      /**
       * Delete
       * TODO: - Test
       * - Deletes the node at the specified index.
       * @param index Index from where to delete the node.
       * @returns The deleted node.
       */
      public delete(index:number):MCLinkedListNode<T> | null {
            if (index === 0) {
                  let newHead = this.head.getNext()!;
                  this.head = newHead;
            } else if (index < this.size() - 1) {
                  var i = 0;
                  var currentNode = this.head;
                  while (i < index - 1) {
                         currentNode = currentNode.getNext()!;
                         i++;
                  }
                  let nextNextNode = currentNode.getNext()!.getNext()!;
                  currentNode.setNext(nextNextNode);
            } else if (index === this.size() - 1) {
                  var i = 0;
                  var currentNode = this.head;
                  while (i < this.size() - 1) {
                        currentNode = currentNode.getNext()!;
                        i++;
                  }
                  currentNode.setNext(null);
            }
            return null
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
       * TODO: - Test
       * - Creates an MCMap from a regular map.
       * @param map Optional map to reconstruct.
       */
      constructor(value:T, next:MCLinkedListNode<T> | null = null) {
            this.value = value;
            this.next = next;
      }

      /**
       * Get Value
       * TODO: - Test
       * - Gets the value of the node.
       * @returns Returns the value.
       */
      public getValue():T {
            return this.value;
      }

      /**
       * Get Next
       * TODO: - Test
       * - Gets the next node.
       * @returns Returns the next node.
       */
      public getNext():MCLinkedListNode<T> | null {
            return this.next;
      }

      /**
       * Set Next
       * TODO: - Test
       * - Sets the next node.
       * @param node Node to set the next node to.
       */
      public setNext(node:MCLinkedListNode<T> | null):void {
            this.next = node;
      }

      /**
       * Has Next
       * TODO: - Test
       * - Checks for the next node.
       * @returns Returns true if the linked list node has next node.
       */
      public hasNext():boolean {
            return this.next != null;
      }

}
