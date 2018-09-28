/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.27.2018
 * Stacks/Main
 */

import * as Utility from "../../utility";
import { MCArray } from "../../arrays/main/arrays-main"

/**
 * Masterclass LIFO stack.
 */
export class MCStack<T> {

      public list:MCArray<T>;

      /**
       * Constructor
       * - Creates an empty MCStack.
       */
      constructor() {
            this.list = new MCArray<T>();
      }

      /**
       * Size
       * - Returns the size of the stack
       * @returns The size of the stack.
       */
      public size():number {
            return this.list.length;
      }

      /**
       * Is Empty
       * - Checks to see if the stack is empty.
       * @return True if the stack is empty, false otherwise.
       */
      public isEmpty():boolean {
            return this.list.isEmpty();
      }

      /**
       * Push
       * - Pushes an element to the top of the stack.
       * @param element Element to push.
       */
      public push(element:T):void {
            this.list.push(element);
      }

      /**
       * Pop
       * - Removes an element from the top of the stack and returns it.
       * @returns Popped element or null.
       */
      public pop():T | null {
            return this.isEmpty() ? null : this.list.pop()!;
      }

      /**
       * Peek
       * - Returns the element at the top of the stack.
       * @returns Top element or null.
       */
      public peek():T | null {
            return this.isEmpty() ? null : this.list[this.list.length - 1]!;
      }

      /**
       * Clear
       * - Clears the stack.
       */
      public clear():void {
            while (!this.isEmpty()) {
                  this.pop();
            }
      }

}
