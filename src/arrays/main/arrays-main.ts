/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Arrays/Main
 */

import * as Utility from "../../utility";
import { MCHeap, MCHeapType } from "../../heaps/main/heaps-main";

/**
 * Masterclass extension of the Array.
 */
export class MCArray<T> extends Array<T> {

      /**
       * Constructor
       * - Creates an MCArray from a regular array.
       * @param items Variadic array elements.
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
       * Set
       * - Sets the value of the MCArray to a new MCArray.
       */
      public set(array:MCArray<T>):void {
            for (let i = 0; i < array.length; i++) {
                  const value = array[i];
                  if (i < this.length) {
                        this[i] = value;
                  } else {
                        this.push(value);
                  }
            }
      }

      /**
       * Clear
       * - Clears all contents of the MCArray.
       */
      public clear():void {
            this.splice(0, this.length);
      }

      /**
       * Filled
       * - Fills the array with a certain number of the same value.
       * @returns The MCArray.
       */
      public filled(withValue:T, length:number):MCArray<T> {
            for (let i = 0; i < length; i++) {
                  this.push(withValue);
            }
            return this
      }

      /**
       * isSorted
       * - Checks to see if the MCArray is sorted.
       * @returns True if sorted, else false.
       */
      public isSorted():boolean {
            let i = 0;
            while (i < this.length - 1) {
                  if (this[i] > this[i + 1]) { return false; }
                  i++;
            }
            return true;
      }

      /**
       * isEmpty
       * - Checks to see if the MCArray is empty
       * @returns True if empty, else false.
       */
      public isEmpty():boolean {
            return this.length === 0;
      }

      /**
       * Shuffled
       * - Returns a shuffled version of the MCArray, without modifying it.
       * @returns A shuffled MCArray.
       */
      public shuffled():MCArray<T> {
            let arr = this.copy();
            for (let i = arr.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
      }

      /**
       * Shuffled
       * - Shuffles the MCArray.
       */
      public shuffle():void {
            for (let i = this.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [this[i], this[j]] = [this[j], this[i]];
            }
      }


      /**
       * Get Unique
       * - O(n^2)
       * - Returns a new MCArray with only unique elements.
       * @returns A new MCArray with unique elements.
       */
      public getUnique():MCArray<T> {
            var uniqueArray = this.copy();
            uniqueArray.filter((value:T, index:number) => uniqueArray.indexOf(value) === index );
            return uniqueArray;
      }


      /**
       * Equals
       * - TODO: - Test
       * - O(n)
       * - Returns a new MCArray with only unique elements.
       * @returns A new MCArray with unique elements.
       */
      public equals(otherArray:MCArray<T>):boolean {

            if (this.length != otherArray.length) {
                  return false;
            }

            for (var i = 0; i < this.length; i++) {
                  if (this[i] instanceof MCArray && otherArray[i] instanceof MCArray) {

                        let thisMCArray = this[i] as any as MCArray<T>;
                        let otherMCArray = otherArray[i] as any as MCArray<T>;

                        if (!thisMCArray.equals(otherMCArray)) {
                              return false;
                        }

                  } else if (this[i] != otherArray[i]) {
                        return false;
                  }
            }

            return true;
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
      public bucketSort(bucketCount:number | null = null):MCArray<T> {
            // Return array if empty
            if (this.isEmpty()) {
                  return this
            }

            // Create an array of buckets
            bucketCount = bucketCount != null ? bucketCount : Math.floor(this.length/3)
            const buckets:MCArray<MCArray<T>> = new MCArray<MCArray<T>>().filled(new MCArray<T>(), bucketCount);

            // Store maximum key in array
            const maximumKey = this.reduce((max:number, value:T) => {
                  const hashCode = (value as any as string).hashCode()
                  if (hashCode > max) {
                        return hashCode
                  }
                  return max
            }, 0)

            // Fill buckets with array's values
            this.forEach((value:T) => buckets[Math.floor((value as any as string).hashCode() / maximumKey * bucketCount!)].push(value))

            // Quicksort each bucket
            for (let i = 0; i < bucketCount; i++) {
                  buckets[i].quickSort();
            }

            // Merge all buckets using a min heap
            let newArray = new MCArray<T>();
            const minHeap = new MCHeap<T>(MCHeapType.min);
            for (let i = 0; i < bucketCount; i++) {
                  for (let j = 0; j < buckets[i].length; j++) {
                        minHeap.insert(buckets[i][j]);
                        newArray.push(minHeap.behead());
                  }
            }

            this.set(newArray);

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
      public bubbleSortRecursive(sortLimit:number | null = null):MCArray<T> {

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

      /**
       * Quick Sort
       * - O(nlog(n))
       * - Partitions the array into subhalves and divides the left and right portions of each subhalf into elements smaller and larger than the given pivot element, respectively.
       * @return The sorted MCArray.
       */
      public quickSort(left:number = 0, right:number = -1):MCArray<T> {
            // Set right if unset
            if (right === -1) { right = this.length - 1; }

            let partition = (l:number, r:number) => {
                  // Set pivot
                  let pivot = this[l];

                  // Instantiate iteration indices
                  var i = l;
                  var j = r;

                  while (true) {
                        while (this[i] < pivot) {
                              i++;
                        }
                        while (this[j] > pivot) {
                              j--;
                        }
                        if (i >= j) {
                              return j;
                        }
                        this.swap(i, j);
                  }
            };

            if (left < right) {
                  var partitionIndex = partition(left, right);
                  this.quickSort(left, partitionIndex);
                  this.quickSort(partitionIndex + 1, right);
            }

            return this;
      }

      /**
       * Bogo Sort
       * - O((n + 1)!)
       * - Ridiculously slow sorting algorithm that generates permutations of the array until it finds a sorted permutation.
       * @return The sorted MCArray.
       */
      public bogoSort():MCArray<T> {
            while (!this.isSorted()) {
                  this.shuffle();
            }
            return this;
      }

      /**
       * Bogo Sort - Fallback
       * - O(n!)
       * - Ridiculously slow sorting algorithm that generates permutations of the array until it finds a sorted permutation.
       * - If all else fails, return the mergeSort of the MCArray, because we know that it's a little more sensible.
       * @return The sorted MCArray.
       */
      public bogoSortFallback():MCArray<T> {
            let i = 0;
            let maximumTries = Utility.factorial(this.length);
            while (i < maximumTries && !this.isSorted()) {
                  this.shuffle();
                  i++;
            }
            return i < maximumTries ? this : this.mergeSort();
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
       * Binary Search - Optimized
       * - O(log(n))
       * - Check if the middle of a sorted array is the element.
       *   - If so, return it's index.
       *   - If it's less than the element, change the right bound to middle.
       *   - If it's greater than the element, change the left bound to middle.
       * @return The index of the found element.
       */
      public binarySearchOptimized(element:T):number {
            var left = 0;
            var right = this.length - 1;
            while (right - left > 1) {
                  var middle = (right + left)/2;
                  if (this[middle] <= element) {
                        left = middle;
                  } else {
                        right = middle;
                  }
            }
            return this[left] === element ? left : -1;
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

      /**
       * Exponential Search
       * - O(log(n))
       * - Binary search, except the function finds a smaller range where the element may occur before searching.
       * @return The index of the found element.
       */
      public exponentialSearch(element:T):number {
            if (this.length > 0) {

                  if (this[0] === element) {
                        return 0;
                  }

                  var i = 1;
                  while (i < this.length && this[i] <= element) {
                        i *= 2;
                  }

                  return this.binarySearchRecursive(element, i/2, Math.min(i, this.length));
            }
            return -1;
      }

      /**
       * Fibonacci Search
       * - O(log(n))
       * - Binary search, except the function finds a smaller range where the element may occur before searching.
       * @return The index of the found element.
       */
      public fibonacciSearch(element:T):number {

            // Initialize fibonacci number - 2 and fibonacci number - 1
            var fibMinus2 = 0;
            var fibMinus1 = 1;

            // Initialize fibonacci number
            var fib = fibMinus2 + fibMinus1;

            // Find the minimum fibonacci number greater than the length
            while (fib < this.length) {
                  fibMinus2 = fibMinus1;
                  fibMinus1 = fib;
                  fib = fibMinus1 + fibMinus2;
            }

            // Mark the eliminated range from the front
            var offset = -1;

            while (fib > 1) {

                  // Check if fibMinus2 is a valid index
                  var i = Math.min(offset + fibMinus2, this.length - 1);

                  if (this[i] < element) {
                        // If the element is greater than the value at index fibMinus2, cut the subarray from offset to i
                        fib = fibMinus1;
                        fibMinus1 = fibMinus2;
                        fibMinus2 = fib - fibMinus1;
                        offset = i;
                  } else if (this[i] > element){
                        // If the element is less than the value at index fibMinus2, cut the subarray after i + 1
                        fib = fibMinus2;
                        fibMinus1 = fibMinus1 - fibMinus2;
                        fibMinus2 = fib - fibMinus1;
                  } else {
                        // Element found
                        return i;
                  }

            }

            if (this[offset + 1] === element) {
                  return offset + 1;
            }

            return -1;
      }

      /**
       * Union
       * - O(n)
       * - Forms the union of two set arrays, joining the two arrays and removing duplicates.
       * @return The union of two arrays.
       */
      public union(other:MCArray<T>):MCArray<T> {
            let set = this.copy();

            // Sort arrays
            set.sort();
            other.sort();

            // Instantiate new union array
            var union = new MCArray<T>();

            // Loop through both arrays and push unique values
            var i = 0;
            var j = 0;
            var previous = null;
            while (i < set.length && j < other.length) {
                  if (set[i] == other[j]) {
                        if (set[i] != previous) {
                              union.push(set[i]);
                        }
                        i++;
                        j++;
                  } else if (set[i] < other[j]) {
                        if (set[i] != previous) {
                              union.push(set[i]);
                        }
                        i++;
                  } else {
                        if (other[j] != previous) {
                              union.push(other[j]);
                        }
                        j++;
                  }
                  previous = union.length > 0 ? union[union.length - 1] : null;
            }

            // Fill with set
            while (i < set.length) {
                  if (set[i] != previous) {
                        union.push(set[i]);
                  }
                  i++;
                  previous = union.length > 0 ? union[union.length - 1] : null;
            }


            // Fill with other
            while (j < other.length) {
                  if (other[j] != previous) {
                        union.push(other[j]);
                  }
                  j++;
                  previous = union.length > 0 ? union[union.length - 1] : null;
            }

            return union;
      }

      /**
       * Flattened
       * - O(n^2)
       * - Recursively flattens an array of arrays into a flat array.
       * @return The flattened array.
       */
      public flattened():MCArray<any> {
            var flattened = new MCArray<any>();

            this.copy().forEach((element:any) => {
                  if (element instanceof MCArray) {
                        // Found an MCArray as an element
                        flattened.push(...element.flattened());
                  } else if (Array.isArray(element)) {
                        // Found a regular array as an element
                        let elementAsMCArray = new MCArray<any>();
                        element.forEach((el) => elementAsMCArray.push(el));
                        flattened.push(...elementAsMCArray.flattened());
                  } else {
                        // Found a non-array as an element
                        flattened.push(element);
                  }
            });

            return flattened;
      }

}
