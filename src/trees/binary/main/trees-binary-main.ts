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

      public root:MCBinaryTreeNode<T> | null;

      /**
       * Constructor
       * - Creates a binary tree.
       * @param root The root of the binary tree. Can't be null.
       */
      constructor(root:MCBinaryTreeNode<T> | null = null) {
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
                  console.log(node.getValue());
                  this.preorderPrint(node.getLeft());
                  this.preorderPrint(node.getRight());
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
                  this.preorderPrint(node.getLeft());
                  console.log(node.getValue());
                  this.preorderPrint(node.getRight());
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
                  this.preorderPrint(node.getLeft());
                  this.preorderPrint(node.getRight());
                  console.log(node.getValue());
            }
      }

      /**
       * Level-Order Print
       * - TODO: - Test
       * - Prints the contents of the binary tree starting from the root or given node.
       * - Done in level-order traversal fashion.
       * @param node The node to start printing from.
       */
      public levelorderPrint(node:MCBinaryTreeNode<T> | null = this.root) {

            let levelOrderPrintUtil = (node:MCBinaryTreeNode<T> | null, level:number) => {
                  if (node) {
                        if (level == 1) {
                              console.log(node.getValue());
                        } else if (level > 1) {
                              levelOrderPrintUtil(node.getLeft(), level - 1);
                              levelOrderPrintUtil(node.getRight(), level - 1);
                        }
                  }
            };

            let height = this.getMaximumDepth(node);

            for (var i = 0; i < height; i++) {
                  levelOrderPrintUtil(node, i + 1);
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
                  return 1 + Math.max(this.getMaximumDepth(node.getLeft()), this.getMaximumDepth(node.getRight()));
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
                  return 1 + this.getCount(node.getLeft()) + this.getCount(node.getRight());
            }
            return 0;
      }

}

/**
 * Masterclass binary tree node.
 */
export class MCBinaryTreeNode<T> {

      private value:T;
      private left:MCBinaryTreeNode<T> | null;
      private right:MCBinaryTreeNode<T> | null;

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

      /**
       * Get Value
       * - Gets the value of the node.
       * @returns Returns the value.
       */
      public getValue():T {
            return this.value;
      }

      /**
       * Get Left
       * - Gets the left node.
       * @returns Returns the left node.
       */
      public getLeft():MCBinaryTreeNode<T> | null {
            return this.left;
      }

      /**
       * Get Right
       * - Gets the right node.
       * @returns Returns the right node.
       */
      public getRight():MCBinaryTreeNode<T> | null {
            return this.right;
      }

      /**
       * Set Value
       * - Sets the value of the node.
       * @param value Value to set.
       */
      public setValue(value:T):void {
            this.value = value;
      }

      /**
       * Set Left
       * - Sets the left child of the node.
       * @param left Left node to set.
       */
      public setLeft(left:MCBinaryTreeNode<T>):void {
            this.left = left;
      }

      /**
       * Set Right
       * - Sets the right child of the node.
       * @param left Right node to set.
       */
      public setRight(right:MCBinaryTreeNode<T>):void {
            this.right = right;
      }

}
