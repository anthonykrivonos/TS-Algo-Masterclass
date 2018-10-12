/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.06.2018
 * Trees/Binary/Main
 */

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

      /**
       * Get Maximum Depth
       * - Returns the maxiumum height from the given node.
       * @param node The node to get depth from.
       * @returns The maxium depth of the tree.
       */
      public getMaximumDepth(node:MCBinaryTreeNode<T> | null = this.root):number {
            if (node) {
                  return 1 + Math.max(this.getMaximumDepth(node.left), this.getMaximumDepth(node.right));
            }
            return 0;
      }

      /**
       * Get Count
       * - Returns the number of nodes in the tree.
       * @param node The node to get depth from.
       * @returns The maxium depth of the tree.
       */
      public getCount(node:MCBinaryTreeNode<T> | null = this.root):number {
            if (node) {
                  return 1 + this.getCount(node.left) + this.getCount(node.right);
            }
            return 0;
      }

}

/**
 * Masterclass binary tree node.
 */
export class MCBinaryTreeNode<T> {

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
      constructor(value:T, left:MCBinaryTreeNode<T> | null = null, right:MCBinaryTreeNode<T> | null = null) {
            this.value = value;
            this.left = left;
            this.right = right;
      }

}
