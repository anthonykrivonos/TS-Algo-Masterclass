/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Maps/Main
 */

import * as Utility from "../../utility";

/**
 * Masterclass hash map/hash table.
 */
export class MCMap<T, U> extends Map<T, U> {

      /**
       * Constructor
       * - Creates an MCMap from a regular map.
       * @param map Optional map to reconstruct.
       */
      constructor(map:Map<T, U> | null = null) {
            map ? super(map) : super();
            Object.setPrototypeOf(this, Object.create(Map.prototype));
      }

      /**
       * Copy
       * - Copies the MCMap and returns its replica.
       * @returns The new MCMap.
       */
      public copy():MCMap<T, U> {
            let map:MCMap<T, U> = new MCMap(this);
            return map;
      }

      /**
       * Get Sorted
       * - Sorts the MCMap by key, ascending.
       * @returns The sorted MCMap.
       */
      public getSorted():MCMap<T, U> {
            return new MCMap<T, U>(new Map([...this.entries()].sort()));
      }

}
