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

      // Interpolation Search
      // Exponential Search
      // Sublist Search (Search a linked list in another list)
      // Fibonacci Search
      // The Ubiquitous Binary Search

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

      //
      // Sorting Algorithms
      //

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
                  var key = this[i];
                  var j = i - 1;
                  while (j >= 0 && this[j] > key) {
                        this[j + 1] = this[j];
                        j--;
                  }
                  this[j + 1] = key;
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

            var key = this[sortLimit];
            var i = sortLimit - 1;
            while (i >= 0 && this[i] > key) {
                  this[i + 1] = this[i];
                  i--;
            }
            this[i + 1] = key;

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

            sortStart = sortStart == null ? 0 : sortStart;
            if (sortStart >= this.length) return this;

            var min = this[sortStart];
            var minIndex = sortStart;

            for (var i = sortStart + 1; i < this.length; i++) {
                  if (this[i] < min) {
                        min = this[i];
                        minIndex = i;
                  }
            }

            this.swap(sortStart, minIndex);

            return this.selectionSortRecursive(sortStart + 1);

      }

      /**
       * Merge Sort
       * - O(nlog(n))
       * - Divides array in halves until each element is in a different array of length 1.
       * - Merge "halves" in sorted order.
       * @return The sorted MCArray.
       */
      public mergeSort():MCArray<T> {

            let mergeSortHelper = (left:number, right:number) => {
                  if (left < right) {
                        let middle = Math.floor((left + right - 1)/2);
                        mergeSortHelper(left, middle);
                        mergeSortHelper(middle + 1, right);
                        merge(left, middle, right);
                  }
            };

            let merge = (left:number, middle:number, right:number) => {
                  let leftArr = [];
                  let rightArr = [];

                  for (var i = left; i < middle + 1; i++) {
                        leftArr.push(this[i]);
                  }
                  for (var i = middle + 1; i < right + 1; i++) {
                        rightArr.push(this[i]);
                  }

                  var i = 0, j = 0, k = left;
                  while (i < leftArr.length && j < rightArr.length) {
                        if (leftArr[i] < rightArr[j]) {
                              this[k] = leftArr[i];
                              i++;
                        } else {
                              this[k] = rightArr[j];
                              j++;
                        }
                        k++;
                  }

                  while (i < leftArr.length) {
                        this[k] = leftArr[i];
                        k++; i++;
                  }

                  while (j < rightArr.length) {
                        this[k] = rightArr[j];
                        k++; j++;
                  }
            };

            mergeSortHelper(0, this.length - 1);

            return this;
      }

      //
      // Searching Algorithms
      //

      /**
       * Linear Search
       * - O(n)
       * - Loops through entire array from start to finish and returns the index of the searched element or -1 otherwise.
       * @return The index of the found element.
       */
      public linearSearch(element:T):number {
            for (var i = 0; i < this.length; i++) {
                  if (this[i] === element) { return i; }
            }
            return -1;
      }

      /**
       * Linear Search - Recursive
       * - O(n)
       * - Loops through entire array from start to finish and returns the index of the searched element or -1 otherwise.
       * - So unnecessary to do it recursively, but whatever floats your boat.
       * @return The index of the found element.
       */
      public linearSearchRecursive(element:T, index:number | null = null):number {
            index = index ? index : 0;

            if (index < this.length) {
                  if (this[index] === element) {
                        return index;
                  }
                  return this.linearSearchRecursive(element, index + 1);
            }

            return -1;
      }

      /**
       * Binary Search
       * - O(log(n))
       * - Check if the middle of a sorted array is the element.
       *   - If so, return it's index.
       *   - If it's less than the element, search the right half.
       *   - If it's greater than the element, search the left half.
       *   - Iterate until the half being searched is empty, then return false if element is not found.
       * @return The index of the found element.
       */
      public binarySearch(element:T):number {
            var left = 0;
            var right = this.length - 1;
            while (left < right) {
                  var middle = Math.floor((left + right - 1)/2);
                  if (this[middle] === element) {
                        return middle;
                  } else if (this[middle] < element) {
                        left = middle + 1;
                  } else {
                        right = middle - 1;
                  }
            }
            return -1;
      }

      /**
       * Binary Search - Recursive
       * - O(log(n))
       * - Check if the middle of a sorted array is the element.
       *   - If so, return it's index.
       *   - If it's less than the element, search the right half.
       *   - If it's greater than the element, search the left half.
       *   - Iterate until the half being searched is empty, then return false if element is not found.
       * @return The index of the found element.
       */
      public binarySearchRecursive(element:T, left:number | null = null, right:number | null = null):number {
            left = left ? left : 0;
            right = right ? right : this.length - 1;

            if (left < right) {
                  var middle = Math.floor((left + right - 1)/2);
                  if (this[middle] === element) {
                        return middle;
                  } else if (this[middle] < element) {
                        return this.binarySearchRecursive(element, middle + 1, right);
                  } else {
                        return this.binarySearchRecursive(element, left, middle - 1);
                  }
            }

            return -1;
      }

      /**
       * Jump Search
       * - O(sqrt(n))
       * - Linearly jump a sorted array by sqrt(n) steps until the first element is greater than the element being searched for.
       * - Go backwards until the element is found.
       * - If the element is not found, return -1.
       * @return The index of the found element.
       */
      public jumpSearch(element:T):number {

            var blockSize = Math.floor(Math.sqrt(this.length));

            var i = 0;
            while (i < this.length && this[i] < element) {
                  i += blockSize;
                  if (i >= this.length) { i = this.length - 1; }
            }

            let minIndexToCheck = i - blockSize;
            while (i >= minIndexToCheck) {
                  if (this[i] === element) { return i; }
                  i--;
            }

            return -1;
      }

      /**
       * Jump Search - Recursive
       * - O(sqrt(n))
       * - Linearly jump a sorted array by sqrt(n) steps until the first element is greater than the element being searched for.
       * - Go backwards until the element is found.
       * - If the element is not found, return -1.
       * @return The index of the found element.
       */
      public jumpSearchRecursive(element:T, i:number | null = null, blockSize:number | null = null):number {

            i = i ? i : 0;
            blockSize = blockSize ? blockSize : Math.floor(Math.sqrt(this.length));

            if (i + blockSize < this.length && this[i] < element) {
                  return this.jumpSearchRecursive(element, i + blockSize, blockSize);
            }

            i = this.length - 1;

            let minIndexToCheck = i - blockSize;
            while (i >= minIndexToCheck) {
                  if (this[i] === element) { return i; }
                  i--;
            }

            return -1;
      }

}
