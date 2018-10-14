/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.01.2018
 * Linked Lists/Main
 */

import { MCArray } from '../../arrays/main/arrays-main';

/**
 * Masterclass linked list implementation.
 */
export class MCLinkedList<T> {

      private head:MCLinkedListNode<T> | null;

      /**
       * Constructor
       * - Creates an MCMap from a regular map.
       * @param map Optional map to reconstruct.
       */
      constructor(head:MCLinkedListNode<T> | null = null) {
            this.head = head;
      }

      /**
       * To Array
       * - Converts the linked list into an array.
       * @returns The linked list as an array.
       */
      public toArray():MCArray<T> {
            var listArray = new MCArray<T>();
            let node = this.head;
            while (node) {
                  listArray.push(node.getValue());
                  node = node.getNext();
            }
            return listArray;
      }

      /**
       * Size
       * - Get the size of the linked list.
       * @returns The size of the list.
       */
      public size():number {
            var size = 1;
            let node = this.head;
            while (node && node.hasNext()) {
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
            if (index >= this.size() && this.head) {
                  let currentNode = this.head;
                  while (currentNode.getNext()) {
                        currentNode = currentNode.getNext()!;
                  }
                  currentNode.setNext(node);
            } else if (index > 0 && this.head) {
                  var i = 0;
                  let currentNode = this.head;
                  while (i < index - 1) {
                        i++;
                        currentNode = currentNode.getNext()!;
                  }
                  let tempNext = currentNode.getNext()!;
                  currentNode.setNext(node);
                  node.setNext(tempNext);
            } else {
                  let tempNext = this.head;
                  this.head = node;
                  node.setNext(tempNext);
            }
      }

      /**
       * Delete
       * - Deletes the node at the specified index.
       * @param index Index from where to delete the node.
       * @returns The deleted node.
       */
      public delete(index:number):MCLinkedListNode<T> | null {
            if (this.head) {
                  if (index === 0) {
                        let oldHead = this.head;
                        let newHead = this.head.getNext()!;
                        this.head = newHead;
                        return oldHead;
                  } else if (index < this.size() - 1) {
                        var i = 0;
                        var currentNode = this.head;
                        while (i < index - 1) {
                               currentNode = currentNode.getNext()!;
                               i++;
                        }
                        let nextNode = currentNode.getNext()!;
                        let nextNextNode = currentNode.getNext()!.getNext()!;
                        currentNode.setNext(nextNextNode);
                        return nextNode;
                  } else if (index === this.size() - 1) {
                        var i = 0;
                        var currentNode = this.head;
                        while (i < this.size() - 1) {
                              currentNode = currentNode.getNext()!;
                              i++;
                        }
                        let nextNode = currentNode.getNext()!;
                        currentNode.setNext(null);
                        return nextNode;
                  }
            }
            return null
      }

}

/**
 * Masterclass linked list node.
 */
export class MCLinkedListNode<ValueType> {

      private value:ValueType;
      private next:MCLinkedListNode<ValueType> | null;

      /**
       * Constructor
       * - Creates a new linked list node.
       * @param value Value of the node.
       * @param next Next node in the list (optional).
       */
      constructor(value:ValueType, next:MCLinkedListNode<ValueType> | null = null) {
            this.value = value;
            this.next = next;
      }

      /**
       * Get Value
       * - Gets the value of the node.
       * @returns Returns the value.
       */
      public getValue():ValueType {
            return this.value;
      }

      /**
       * Get Next
       * - Gets the next node.
       * @returns Returns the next node.
       */
      public getNext():MCLinkedListNode<ValueType> | null {
            return this.next;
      }

      /**
       * Set Value
       * - Sets the value of the node.
       * @param value Value to set.
       */
      public setValue(value:ValueType):void {
            this.value = value;
      }

      /**
       * Set Next
       * - Sets the next node.
       * @param node Node to set the next node to.
       */
      public setNext(node:MCLinkedListNode<ValueType> | null):void {
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
