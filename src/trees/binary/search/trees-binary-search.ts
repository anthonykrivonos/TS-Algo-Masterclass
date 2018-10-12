/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.11.2018
 * Trees/Binary/Search
 */

 import { MCBinaryTree, MCBinaryTreeNode } from '../main/trees-binary-main';

/**
 * Masterclass regular binary tree.
 */
export class MCBinarySearchTree<T> extends MCBinaryTree<T> {

      /**
       * Constructor
       * - Creates a binary tree.
       * @param root The root of the binary tree. Can't be null.
       */
      constructor(root:MCBinaryTreeNode<T>) {
            super(root);
      }

      /**
       * Insert
       * - Inserts a value into the binary search tree.
       * @param value Value of the new node to insert.
       * @param node The node to start insertion from.
       * @returns The inserted node.
       */
      public insert(value:T, node:MCBinaryTreeNode<T> | null = this.root):MCBinaryTreeNode<T> {
            if (!node) {
                  return new MCBinaryTreeNode(value);
            } else if (value < node!.value) {
                  node.left = this.insert(value, node.left);
            } else if (value > node!.value) {
                  node.right = this.insert(value, node.right);
            }
            return node;
      }

      /**
       * Find
       * - Searches a binary search tree for the first instance of a given value.
       * @param value Value to search for.
       * @param node The node to start search from.
       * @returns The found node or null.
       */
      public find(value:T, node:MCBinaryTreeNode<T> | null = this.root):MCBinaryTreeNode<T> | null {
            if (!node) {
                  return null;
            } else if (node.value == value) {
                  return node!;
            } else if (value < node!.value) {
                  return this.find(value, node.left);
            }
            return this.find(value, node.right);
      }

}
