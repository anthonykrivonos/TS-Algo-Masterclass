/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Arrays/Main
 */

import * as Utility from "../../utility";
import { MCArray } from "../../arrays/main/arrays-main";

/**
 * Masterclass grid, or matrix class.
 */
export class MCGrid<T> {

      private grid:MCArray<MCArray<T>>;

      /**
       * Constructor
       * - Creates an MCArray from a regular array.
       * @param items Variadic array elements.
       */
      constructor(rows:MCArray<MCArray<T>>) {
            this.grid = rows;
      }

      /**
       * Get
       * - Gets the value at the given row and column.
       * @param row Row index.
       * @param col Column index.
       * @returns The value at the given row and column.
       */
      public get(row:number, col:number):T {
            return this.grid[row][col];
      }

      /**
       * Set
       * - Sets the value at the given row and column.
       * @param value New value to set.
       * @param row Row index.
       * @param col Column index.
       */
      public set(value:T, row:number, col:number):void {
            this.grid[row][col] = value;
      }

      /**
       * For Each
       * - Loops through every value in the grid and calls a callback.
       * @param callback Function with parameters (value, row, column) called on every iteration.
       */
      public forEach(callback:Function):void {
            for (var i = 0; i < this.grid.length; i++) {
                  for (var j = 0; j < this.grid[i].length; j++) {
                        callback(this.get(i, j), i, j);
                  }
            }
      }

      /**
       * Map
       * - Loops through every value in the grid and calls a callback.
       * @param callback Function with parameters (value, row, column) that returns a new value for grid[row][column].
       */
      public map(callback:Function):void {
            for (var i = 0; i < this.grid.length; i++) {
                  for (var j = 0; j < this.grid[i].length; j++) {
                        this.set(callback(this.get(i, j), i, j), i, j);
                  }
            }
      }

      /**
       * Flattened
       * - Returns the grid as a one-dimensional array.
       * @returns The grid as an MCArray.
       */
      public flattened():MCArray<T> {
            var flattenedGrid = new MCArray<T>();
            this.forEach((value:T) => flattenedGrid.push(value));
            return flattenedGrid;
      }

      /**
       * Sort
       * - Merge sorts the grid row by row, column by column, in ascending order.
       * @returns The new MCArray.
       */
      public sort(callback:Function):void {
            var flattenedSortedGrid = this.flattened().mergeSort();
            var i = 0;
            this.map(() => {
                  let sortedValue = flattenedSortedGrid[i];
                  i++;
                  return sortedValue;
            });
      }

}
