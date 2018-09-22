/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Arrays/Tests
 */

import { MCArray } from '../main/arrays-main';

let arrToSort = new MCArray(1, 3, 6, 2, 4, 8, 5, 9, 7);

// Call Tests
console.log(`Testing Sorting Functions on ${arrToSort}`);

// Test Bubble Sort
console.log("Bubble Sort");
console.log(arrToSort.bubbleSort());
console.log(arrToSort.bubbleSortOptimized());
console.log(arrToSort.bubbleSortRecursive());

// Test Insertion Sort
console.log("Insertion Sort");
console.log(arrToSort.insertionSort());
console.log(arrToSort.insertionSortRecursive());

// Test Selection Sort
console.log("Selection Sort");
console.log(arrToSort.selectionSort());
console.log(arrToSort.selectionSortRecursive());
