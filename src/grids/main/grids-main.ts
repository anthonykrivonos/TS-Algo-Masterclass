/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Grids/Main
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
       * @returns True if set, false otherwise.
       */
      public set(value:T, row:number, col:number):boolean {
            if (this.isValidIndex(row, col)) {
                  this.grid[row][col] = value;
                  return true;
            }
            return false;
      }

      /**
       * Is Valid Index
       * - Checks to see if the index exists in the grid.
       * @param row Row index.
       * @param col Column index.
       * @returns True if valid, false otherwise.
       */
      public isValidIndex(row:number, col:number):boolean {
            return row >= 0 && col >= 0 && this.grid.length > row && this.grid[row].length > col;
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
       * @returns The sorted MCGrid.
       */
      public sort(callback:Function):MCGrid<T> {
            var flattenedSortedGrid = this.flattened().mergeSort();
            var i = 0;
            this.map(() => {
                  let sortedValue = flattenedSortedGrid[i];
                  i++;
                  return sortedValue;
            });
            return this;
      }

      /**
       * Flood Fill
       * - Recursively fills the grid with the given element until the same element is found as a neighbor.
       * - Starts at a row and column index.
       * - Like the paint bucket tool on most drawing apps.
       * @param withElement The element to fill with.
       * @param atRow The row to start from.
       * @param atCol The column to start from.
       */
      public floodFill(withElement:T, atRow:number, atCol:number):void {
            if (this.isValidIndex(atRow, atCol) && this.get(atRow, atCol) != withElement) {
                  this.set(withElement, atRow, atCol);
                  this.floodFill(withElement, atRow - 1, atCol);
                  this.floodFill(withElement, atRow + 1, atCol);
                  this.floodFill(withElement, atRow, atCol - 1);
                  this.floodFill(withElement, atRow, atCol + 1);
            }
      }

      // https://www.geeksforgeeks.org/a-search-algorithm/

}
