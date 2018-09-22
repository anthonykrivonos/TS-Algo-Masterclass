/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Arrays/Main
 */

/**
 * Masterclass extension of the Array.
 */
export class MCArray<T> extends Array<T> {

      // TODO:
      // Bucket sort
      // Bucket sort recursive
      // Heapsort
      // Heapsort recursive
      // Mergesort

      // Linear Search
      // Binary Search
      // Jump Search
      // Interpolation Search
      // Exponential Search
      // Sublist Search (Search a linked list in another list)
      // Fibonacci Search
      // The Ubiquitous Binary Search
      // Recursive program to linearly search an element in a given array

      /**
       * Create
       * - Creates an MCArray from a regular array.
       * @param array Generic JavaScript array.
       * @returns A new MCArray.
       */
      constructor(...items:Array<T>) {
            super(...items);
            Object.setPrototypeOf(this, Object.create(MCArray.prototype));
      }

      /**
       * Copy
       * - Copies the MCArray and returns its replica.
       * @returns The new MCArray.
       */
      public copy():MCArray<T> {
            let mcArray:MCArray<any> = this.slice() as MCArray<T>;
            return mcArray;
      }

      /**
       * Swap
       * - Swap two elements in an array.
       * @param i Index of first item to swap.
       * @param j Index of second item to swap.
       */
      public swap(i:number, j:number):void {
            var temp:T = this[i];
            this[i] = this[j];
            this[j] = temp;
      }

      /**
       * WARNING: Requires implementation.
       * Bucket Sort
       * NOTE: Test this out.
       * - O(n^2)
       * - Create buckets and put elements in them.
       * - Apply insertion sort to sort the elements in each bucket.
       * - Join the sorted buckets.
       * @return The sorted MCArray.
       */
      public bucketSort():MCArray<T> {

            return this;
      }

      /**
       * Bubble Sort
       * - O(n^2)
       * - Repeatedly swap the adjacent elements if they are in wrong order.
       * @return The sorted MCArray.
       */
      public bubbleSort():MCArray<T> {
            for (var i = 0; i < this.length; i++) {
                  for (var j = 0; j < this.length - i - 1; j++) {
                        if (this[j] > this[j + 1]) {
                              this.swap(j, j + 1);
                        }
                  }
            }
            return this;
      }

      /**
       * Bubble Sort - Optimized
       * - Repeatedly swap the adjacent elements if they are in wrong order.
       * - If no swaps occur, break the outter loop.
       * @return The sorted MCArray.
       */
      public bubbleSortOptimized():MCArray<T> {
            var didSwap:boolean = false;
            for (var i = 0; i < this.length; i++) {
                  didSwap = false;
                  for (var j = 0; j < this.length - i - 1; j++) {
                        if (this[j] > this[j + 1]) {
                              this.swap(j, j + 1);
                              didSwap = true;
                        }
                  }
                  if (!didSwap) break;
            }
            return this;
      }

      /**
       * Bubble Sort - Recursive
       * - O(n^2)
       * - Repeatedly swap the adjacent elements if they are in wrong order.
       * @param sortLimit The upper limit for sorting. Default = null sorts the whole list.
       * @return The sorted MCArray.
       */
      public bubbleSortRecursive(sortLimit:number | null = null):MCArray<T>{

            sortLimit = sortLimit == null ? this.length : sortLimit;
            if (sortLimit < 1) return this;

            for (var i = 0; i < sortLimit - 1; i++) {
                  if (this[i] > this[i + 1]) {
                        this.swap(i, i + 1);
                  }
            }
            return this.bubbleSortRecursive(sortLimit - 1);
      }

      /**
       * Insertion Sort
       * - O(n^2)
       * - Select the first unsorted element.
       * - Swap other elements to the right to create the correct position and shift the unsorted element.
       * - Advance the marker to the right by one element.
       * @return The sorted MCArray.
       */
      public insertionSort():MCArray<T> {
            for (var i = 1; i < this.length; i++) {
                  var j = i - 1;
                  while (j >= 0 && this[j] > this[i]) {
                        this[j + 1] = this[j];
                        j--;
                  }
                  this[j + 1] = this[i];
            }
            return this;
      }

      /**
       * Insertion Sort - Recursive
       * - O(n^2)
       * - Select the first unsorted element.
       * - Swap other elements to the right to create the correct position and shift the unsorted element.
       * - Advance the marker to the right by one element.
       * @param sortLimit The upper limit for sorting. Default = null sorts the whole list.
       * @return The sorted MCArray.
       */
      public insertionSortRecursive(sortLimit:number | null = null):MCArray<T> {

            sortLimit = sortLimit == null ? this.length - 1 : sortLimit;
            if (sortLimit < 1) return this;

            this.insertionSortRecursive(sortLimit - 1);

            var i = sortLimit - 1;
            while (i >= 0 && this[i] > this[sortLimit]) {
                  this[i + 1] = this[i];
                  i--;
            }
            this[i + 1] = this[sortLimit];

            return this;
      }

      /**
       * Selection Sort
       * - O(n^2)
       * - Start at the rightmost element.
       * - Swap the largest element on the left part of the array with this element.
       * - Repeat until the beginning of the array is reached.
       * @return The sorted MCArray.
       */
      public selectionSort():MCArray<T> {
            for (var i = this.length - 1; i >= 0; i--) {
                  var max = this[i];
                  var maxIndex = i;
                  for (var j = i; j >= 0; j--) {
                        if (this[j] > max) {
                              max = this[j];
                              maxIndex = j;
                        }
                  }
                  this.swap(i, maxIndex);
            }
            return this;
      }

      /**
       * Selection Sort - Recursive
       * - O(n^2)
       * - Start at the rightmost element.
       * - Swap the largest element on the left part of the array with this element.
       * - Repeat until the beginning of the array is reached.
       * @param sortStart The lower limit for sorting. Default = null sorts the whole list.
       * @return The sorted MCArray.
       */
      public selectionSortRecursive(sortStart:number | null = null):MCArray<T> {

            sortStart = sortStart == null ? this.length : sortStart;
            if (sortStart >= this.length) return this;

            var min = this[sortStart];
            var minIndex = sortStart;

            for (var i = sortStart + 1; i < this.length; i++) {
                  if (this[i] < min) {
                        min = this[i];
                        minIndex = i;
                  }
            }
            this.swap(i, minIndex);
            return this.selectionSortRecursive(sortStart + 1);
      }

      /**
       * Merge Sort
       * - O(nlog(n))
       * - Divides array in halves until each element is in a different array of length 1.
       * - Merge "halves" in sorted order.
       * @param sortStart The lower limit for sorting. Default = null sorts the whole list.
       * @return The sorted MCArray.
       */
      public mergeSort():MCArray<T> {
            return this;
      }

}
