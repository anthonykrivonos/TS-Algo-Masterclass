/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 03.14.2019
 * Heaps/Main
 */

import * as Utility from "../../utility";
import { MCArray } from "../../arrays/main/arrays-main"

/**
 * Masterclass Heap type (min or max).
 */
export enum MCHeapType {
    min,
    max
}

/**
 * Masterclass Heap.
 */
export class MCHeap<T> {

      private type:MCHeapType;
      public list:MCArray<T>;

      /**
       * Constructor
       * - Creates an empty MCQueue.
       */
      constructor(type:MCHeapType) {
            this.list = new MCArray<T>();
            this.type = type;
      }

      // Static getters
      private static getParentIndex = (index:number) => Math.floor((index - 1)/2);
      private static getLeftIndex = (index:number) => 2 * index + 1;
      private static getRightIndex = (index:number) => 2 * index + 2;

      // Value getters
      private getParent = (index:number) => this.list[MCHeap.getParentIndex(index)];
      private getLeft = (index:number) => this.list[MCHeap.getLeftIndex(index)];
      private getRight = (index:number) => this.list[MCHeap.getRightIndex(index)];
      private getValue = (index:number) => this.list[index];

      /**
       * inOrderContains
       * - Check if the heap contains a value, using in-order traversal.
       * @param value The value of the element to search.
       * @param startingIndex (default: 0) The current index being searched.
       * @returns True if the heap contains the provided value, false otherwise.
       */
      public inOrderContains(value:T, startingIndex:number = 0):boolean {
        return startingIndex < this.list.length && 
            (  this.inOrderContains(value, MCHeap.getLeftIndex(startingIndex))
            || this.getValue(startingIndex) === value
            || this.inOrderContains(value, MCHeap.getRightIndex(startingIndex)))
      }

      /**
       * preOrderContains
       * - Check if the heap contains a value, using pre-order traversal.
       * @param value The value of the element to search.
       * @param startingIndex (default: 0) The current index being searched.
       * @returns True if the heap contains the provided value, false otherwise.
       */
      public preOrderContains(value:T, startingIndex:number = 0):boolean {
        return startingIndex < this.list.length && 
            (  this.getValue(startingIndex) === value
            || this.inOrderContains(value, MCHeap.getLeftIndex(startingIndex))
            || this.inOrderContains(value, MCHeap.getRightIndex(startingIndex)))
      }

      /**
       * postOrderContains
       * - Check if the heap contains a value, using post-order traversal.
       * @param value The value of the element to search.
       * @param startingIndex (default: 0) The current index being searched.
       * @returns True if the heap contains the provided value, false otherwise.
       */
      public postOrderContains(value:T, startingIndex:number = 0):boolean {
        return startingIndex < this.list.length && 
            (  this.inOrderContains(value, MCHeap.getLeftIndex(startingIndex))
            || this.inOrderContains(value, MCHeap.getRightIndex(startingIndex))
            || this.getValue(startingIndex) === value)
      }

      /**
       * insert
       * - Inserts a value into the min/max heap.
       * @param value The value of the element to insert.
       * @param startingIndex (default: 0) The current index being inserted into.
       * @returns True if the heap contains the provided value, false otherwise.
       */
      public insert(value:T):void {
        
        // Insert into list
        this.list.push(value);

        // Sift up
        this.bubbleUp(this.list.length - 1);
      }
      
    /**
     * bubbleUp
     * - Swaps the values from the end until the root is filled and the heap is restored.
     * @param index The value to swap with its parent.
     */
    private bubbleUp(index:number):void {
        if (index != 0) {
            const parentIndex = MCHeap.getParentIndex(index);
            if ((this.type === MCHeapType.min && this.list[parentIndex] > this.list[index])
                || (this.type === MCHeapType.max && this.list[parentIndex] <= this.list[index])) {
                this.list.swap(parentIndex, index);
                this.bubbleUp(parentIndex);
            }
        }
    }


    public behead():T {

        // Remove the first index
        const root = this.list.splice(0, 1)[0];
        this.bubbleUp(this.list.length - 1);

        // Return the old root
        return root;
    }

}
