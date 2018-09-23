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
console.log(arrToSort.copy().bubbleSort());
console.log(arrToSort.copy().bubbleSortOptimized());
console.log(arrToSort.copy().bubbleSortRecursive());

// Test Insertion Sort
console.log("Insertion Sort");
console.log(arrToSort.copy().insertionSort());
console.log(arrToSort.copy().insertionSortRecursive());

// Test Selection Sort
console.log("Selection Sort");
console.log(arrToSort.copy().selectionSort());
console.log(arrToSort.copy().selectionSortRecursive());

// Test Merge Sort
console.log("Merge Sort");
console.log(arrToSort.copy().mergeSort());

// Test Linear Search for 3
console.log("Linear Searching for 3");
console.log(arrToSort.copy().linearSearch(3));
console.log(arrToSort.copy().linearSearchRecursive(3));

// Test Binary Search for 6
console.log("Binary Searching Sorted Array for 6");
console.log(arrToSort.copy().mergeSort().binarySearch(6));
console.log(arrToSort.copy().mergeSort().binarySearchRecursive(6));

// Test Jump Search for 7
console.log("Binary Searching Sorted Array for 7");
console.log(arrToSort.copy().mergeSort().jumpSearch(7));
console.log(arrToSort.copy().mergeSort().jumpSearchRecursive(7));
