/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.27.2018
 * Queues/Main
 */

import * as Utility from "../../utility";
import { MCQueue } from "../main/queues-main";
import { MCStack } from "../../stacks/main/stacks-main";

/**
 * Masterclass FIFO queue with priority determined by a comparator function.
 */
export class MCPriorityQueue<T> extends MCQueue<T> {

      /**
       * Comparator
       * - Function that compares two values of type T to determine priority (-1 if descending, 0 if same, 1 if ascending).
       */
      private comparator:(a:T, b:T)=>number;

      /**
       * Constructor
       * - Creates an empty MCQueue.
       */
      constructor(comparator:(a:T, b:T)=>number) {
            super();
            this.comparator = comparator;
      }

      /**
       * Add
       * TODO: - Test
       * - O(n)
       * - Adds an element to the top proper position in the queue.
       * - Priority is based on the comparator function.
       * @param element Element to add.
       */
      public add(element:T):void {
            if (this.isEmpty()) {
                  // If the queue is empty, add the element without comparison
                  super.add(element);
            } else {
                  var comparisonStack = new MCStack<T>();
                  while (!this.isEmpty() && this.comparator(element, this.peek()!) < 0) {
                        comparisonStack.push(this.poll()!)
                  }
                  super.add(element);
                  while (!comparisonStack.isEmpty()) {
                        super.add(comparisonStack.pop()!);
                  }
            }
      }

}
