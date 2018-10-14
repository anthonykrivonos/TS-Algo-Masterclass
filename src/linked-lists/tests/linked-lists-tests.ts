/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.13.2018
 * Graphs/Tests
 */

import * as Utility from '../../utility';
import { MCLinkedList, MCLinkedListNode } from '../main/linked-lists-main';

let list = new MCLinkedList();

// Call Tests
console.log(`🔎 Calling MCLinkedList Tests`);

// Test Node Insertion
Utility.analyze(MCLinkedList.prototype.insert, list, 0, new MCLinkedListNode(1));
Utility.analyze(MCLinkedList.prototype.insert, list, 1, new MCLinkedListNode(2));
Utility.analyze(MCLinkedList.prototype.insert, list, 2, new MCLinkedListNode(3));
Utility.analyze(MCLinkedList.prototype.insert, list, 3, new MCLinkedListNode(4));
Utility.analyze(MCLinkedList.prototype.insert, list, 1, new MCLinkedListNode(1.5));
Utility.analyze(MCLinkedList.prototype.insert, list, 0, new MCLinkedListNode(0));
Utility.analyze(MCLinkedList.prototype.insert, list, 100000, new MCLinkedListNode(5));

// Test LinkedList Size I
Utility.analyze(MCLinkedList.prototype.size, list);
Utility.analyze(MCLinkedList.prototype.sizeRecursive, list);

// Test LinkedList to Array
Utility.analyze(MCLinkedList.prototype.toArray, list);

// Test Node Deletion
Utility.analyze(MCLinkedList.prototype.delete, list, 2);

// Test LinkedList to Array II
Utility.analyze(MCLinkedList.prototype.toArray, list);
