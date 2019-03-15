/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.13.2018
 * Graphs/Heaps
 */

import * as Utility from '../../utility';
import { MCHeap, MCHeapType } from '../main/heaps-main';

// Call Tests
console.log(`🔎 Calling MCHeap Tests`);

// Max Heap
const heap = new MCHeap<number>(MCHeapType.max);

// Test insertion
Utility.analyze(MCHeap.prototype.insert, heap, 2);
Utility.analyze(MCHeap.prototype.insert, heap, 3);
Utility.analyze(MCHeap.prototype.insert, heap, 1);
Utility.analyze(MCHeap.prototype.insert, heap, 3);

// Test contains
Utility.analyze(MCHeap.prototype.inOrderContains, heap, 4);
Utility.analyze(MCHeap.prototype.inOrderContains, heap, 2);
Utility.analyze(MCHeap.prototype.preOrderContains, heap, 4);
Utility.analyze(MCHeap.prototype.preOrderContains, heap, 2);
Utility.analyze(MCHeap.prototype.postOrderContains, heap, 4);
Utility.analyze(MCHeap.prototype.postOrderContains, heap, 2);