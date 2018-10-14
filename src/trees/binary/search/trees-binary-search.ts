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
       * Insert
       * TODO: - Test
       * - Inserts a value into the binary search tree.
       * @param value Value of the new node to insert.
       * @param node The node to start insertion from.
       * @returns The inserted node.
       */
      public insert(value:T, node:MCBinaryTreeNode<T> | null = this.root):MCBinaryTreeNode<T> {
            if (!this.root) {
                  this.root = new MCBinaryTreeNode(value);
                  return this.root;
            } else if (!node) {
                  return new MCBinaryTreeNode(value);
            } else if (value < node!.getValue()) {
                  node.setLeft(this.insert(value, node.getLeft()));
            } else if (value > node!.getValue()) {
                  node.setRight(this.insert(value, node.getRight()));
            }
            return node;
      }

      /**
       * Find
       * TODO: - Test
       * - Searches a binary search tree for the first instance of a given value.
       * @param value Value to search for.
       * @param node The node to start search from.
       * @returns The found node or null.
       */
      public find(value:T, node:MCBinaryTreeNode<T> | null = this.root):MCBinaryTreeNode<T> | null {
            if (!node) {
                  return null;
            } else if (node.getValue() == value) {
                  return node!;
            } else if (value < node!.getValue()) {
                  return this.find(value, node.getLeft());
            }
            return this.find(value, node.getRight());
      }



}
