/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Arrays/Tests
 */

import * as Utility from '../../utility';
import { MCArray } from '../main/arrays-main';

let arrToSort = new MCArray(1, 3, 6, 2, 4, 8, 5, 9, 7);

let arrToFlatten = new MCArray([1, 4, 6], [2], [5], [3, 7, 8]);

let arrayUnionA = new MCArray(1, 3, 8, 5, 7);

let arrayUnionB = new MCArray(8, 6, 5, 4, 2, 1, 0);

// Call Tests
Utility.print(`🔎 Calling MCArray Tests`);

// Test Bubble Sort
Utility.analyze(MCArray.prototype.bubbleSort, arrToSort.copy());
Utility.analyze(MCArray.prototype.bubbleSortOptimized, arrToSort.copy());
Utility.analyze(MCArray.prototype.bubbleSortRecursive, arrToSort.copy());

// Test Insertion Sort
Utility.analyze(MCArray.prototype.insertionSort, arrToSort.copy());
Utility.analyze(MCArray.prototype.insertionSortRecursive, arrToSort.copy());

// Test Selection Sort
Utility.analyze(MCArray.prototype.selectionSort, arrToSort.copy());
Utility.analyze(MCArray.prototype.selectionSortRecursive, arrToSort.copy());

// Test Merge Sort
Utility.analyze(MCArray.prototype.mergeSort, arrToSort.copy());

// Test Bogo Sort
Utility.analyze(MCArray.prototype.bogoSort, new MCArray(2, 5, 1, 9, 5, 6, 1, 9, 8, 4, 2));
Utility.analyze(MCArray.prototype.bogoSortFallback, new MCArray(2, 5, 1, 9, 5, 6, 1, 9, 8, 4, 2));

// Test Quicksort
Utility.analyze(MCArray.prototype.quickSort, arrToSort.copy());

// Test Bucket Sort
Utility.analyze(MCArray.prototype.bucketSort, arrToSort.copy());

// Test Linear Search for 3
Utility.analyze(MCArray.prototype.linearSearch, arrToSort.copy(), 3);
Utility.analyze(MCArray.prototype.linearSearchRecursive, arrToSort.copy(), 3);

// Test Binary Search for 6
Utility.analyze(MCArray.prototype.mergeSort().binarySearch, arrToSort.copy().mergeSort(), 6);
Utility.analyze(MCArray.prototype.mergeSort().binarySearchOptimized, arrToSort.copy().mergeSort(), 6);
Utility.analyze(MCArray.prototype.mergeSort().binarySearchRecursive, arrToSort.copy().mergeSort(), 6);

// Test Jump Search for 7
Utility.analyze(MCArray.prototype.jumpSearch, arrToSort.copy().mergeSort(), 7);
Utility.analyze(MCArray.prototype.jumpSearchRecursive, arrToSort.copy().mergeSort(), 7);

// Test Exponential Search for 8
Utility.analyze(MCArray.prototype.exponentialSearch, arrToSort.copy().mergeSort(), 8);

// Test Fibonacci Search for 4
Utility.analyze(MCArray.prototype.fibonacciSearch, arrToSort.copy().mergeSort(), 4);

// Test Array Union
Utility.analyze(MCArray.prototype.union, arrayUnionA, arrayUnionB);

// Test Array Flatten
Utility.analyze(MCArray.prototype.flattened, arrToFlatten);
