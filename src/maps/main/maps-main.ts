/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Arrays/Main
 */

import * as Utility from "../../utility";

/**
 * Masterclass hash map/hash table.
 */
export class MCMap<T> extends Map<T, T> {

      /**
       * Constructor
       * - Creates an MCMap from a regular map.
       * @param map Optional map to reconstruct.
       */
      constructor(map:Map<T, T> | null = null) {
            map ? super(map) : super();
            Object.setPrototypeOf(this, Object.create(Map.prototype));
      }

      /**
       * Copy
       * - Copies the MCMap and returns its replica.
       * @returns The new MCMap.
       */
      public copy():MCMap<T> {
            let map:MCMap<any> = new MCMap(this);
            return map;
      }

      /**
       * Get Sorted
       * - Sorts the MCMap by key, ascending.
       * @returns The sorted MCMap.
       */
      public getSorted():MCMap<T> {
            return new MCMap<T>(new Map([...this.entries()].sort()));
      }

}
