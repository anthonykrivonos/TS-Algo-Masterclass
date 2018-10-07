/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.06.2018
 * Trees/Binary/Main
 */

import * as Utility from "../../../utility";

/**
 * Masterclass regular binary tree.
 */
export class MCBinaryTree<T> {

      public root:MCBinaryTreeNode<T>;

      /**
       * Constructor
       * - Creates a binary tree.
       * @param root The root of the binary tree. Can't be null.
       */
      constructor(root:MCBinaryTreeNode<T>) {
            this.root = root;
      }

      /**
       * Pre-Order Print
       * - Prints the contents of the binary tree starting from the root or given node.
       * - Done in pre-order traversal fashion.
       * @param node The node to start printing from.
       */
      public preorderPrint(node:MCBinaryTreeNode<T> | null = this.root) {
            if (node) {
                  console.log(node.value);
                  this.preorderPrint(node.left);
                  this.preorderPrint(node.right);
            }
      }

      /**
       * In-Order Print
       * - Prints the contents of the binary tree starting from the root or given node.
       * - Done in in-order traversal fashion.
       * @param node The node to start printing from.
       */
      public inorderPrint(node:MCBinaryTreeNode<T> | null = this.root) {
            if (node) {
                  this.preorderPrint(node.left);
                  console.log(node.value);
                  this.preorderPrint(node.right);
            }
      }

      /**
       * Post-Order Print
       * - Prints the contents of the binary tree starting from the root or given node.
       * - Done in post-order traversal fashion.
       * @param node The node to start printing from.
       */
      public postorderPrint(node:MCBinaryTreeNode<T> | null = this.root) {
            if (node) {
                  this.preorderPrint(node.left);
                  this.preorderPrint(node.right);
                  console.log(node.value);
            }
      }

}

/**
 * Masterclass binary tree node.
 */
class MCBinaryTreeNode<T> {

      public value:T;
      public left:MCBinaryTreeNode<T> | null;
      public right:MCBinaryTreeNode<T> | null;

      /**
       * Constructor
       * - Constructs a new binary tree node.
       * @param value The value of the node.
       * @param left The node's left child.
       * @param right The node's right child.
       */
      constructor(value:T, left:MCBinaryTreeNode<T> | null, right:MCBinaryTreeNode<T> | null) {
            this.value = value;
            this.left = left;
            this.right = right;
      }

}
