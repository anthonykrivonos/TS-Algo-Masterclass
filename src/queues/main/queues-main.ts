/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.27.2018
 * Queues/Main
 */

import * as Utility from "../../utility";
import { MCArray } from "../../arrays/main/arrays-main"

/**
 * Masterclass FIFO queue.
 */
export class MCQueue<T> {

      public list:MCArray<T>;

      /**
       * Constructor
       * - Creates an empty MCQueue.
       */
      constructor() {
            this.list = new MCArray<T>();
      }

      /**
       * Size
       * - Returns the size of the queue
       * @returns The size of the queue.
       */
      public size():number {
            return this.list.length;
      }

      /**
       * Is Empty
       * - Checks to see if the queue is empty.
       * @return True if the queue is empty, false otherwise.
       */
      public isEmpty():boolean {
            return this.list.isEmpty();
      }

      /**
       * Push
       * - Adds an element to the top of the queue.
       * @param element Element to add.
       */
      public add(element:T):void {
            this.list.push(element);
      }

      /**
       * Poll
       * - Removes an element from the bottom of the queue and returns it.
       * @returns Polled element or null.
       */
      public poll():T | null {
            return this.isEmpty() ? null : this.list.shift()!;
      }

      /**
       * Peek
       * - Returns the element at the bottom of the queue.
       * @returns Bottom element or null.
       */
      public peek():T | null {
            return this.isEmpty() ? null : this.list[0]!;
      }

      /**
       * Clear
       * - Clears the queue.
       */
      public clear():void {
            while (!this.isEmpty()) {
                  this.poll();
            }
      }

}
