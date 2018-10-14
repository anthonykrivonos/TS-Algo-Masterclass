/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.14.2018
 * Trees/Tests
 */

import * as Utility from '../../../utility';
import { MCBinaryTree } from '../main/trees-binary-main';
import { MCBinarySearchTree } from '../search/trees-binary-search';

let bst = new MCBinarySearchTree();

// Call Tests
console.log(`🔎 Calling MCBinarySearchTree Tests`);

// Test Node Insertion
Utility.analyze(MCBinarySearchTree.prototype.insert, bst, 4);
Utility.analyze(MCBinarySearchTree.prototype.insert, bst, 3);
Utility.analyze(MCBinarySearchTree.prototype.insert, bst, 5);
Utility.analyze(MCBinarySearchTree.prototype.insert, bst, 1);
Utility.analyze(MCBinarySearchTree.prototype.insert, bst, 2);
Utility.analyze(MCBinarySearchTree.prototype.insert, bst, 7);
Utility.analyze(MCBinarySearchTree.prototype.insert, bst, 6);

// Test Pre-order Traversal
Utility.analyze(MCBinarySearchTree.prototype.preorderPrint, bst);

// Test In-order Traversal
Utility.analyze(MCBinarySearchTree.prototype.inorderPrint, bst);

// Test Post-order Traversal
Utility.analyze(MCBinarySearchTree.prototype.postorderPrint, bst);

// Test Level-order Traversal
Utility.analyze(MCBinarySearchTree.prototype.levelorderPrint, bst);
