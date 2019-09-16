/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.16.2019
 * Trees/Binary/RedBlack
 */

import { MCBinaryTreeNode } from '../main/trees-binary-main';
import { MCBinarySearchTree } from '../search/trees-binary-search';

/**
 * Masterclass red black tree.
 */
export class MCRedBlackTree<T> extends MCBinarySearchTree<T> {

    constructor(root?:MCRedBlackTreeNode<T>) {
        super(root)
    }

    public isEmpty():boolean {
        return this.root === null
    }

    public contains(value:T) {
        return this.find(value) != null
    }

}

export enum MCRedBlackColor {
    RED,
    BLACK
}

class MCRedBlackTreeNode<T> extends MCBinaryTreeNode<T> {

    private color:MCRedBlackColor

    private size:number

    constructor(value:T, size:number, color:MCRedBlackColor, left?:MCRedBlackTreeNode<T>, right?:MCRedBlackTreeNode<T>) {
        super(value, left, right)
        this.color = color
        this.size = size
    }

    public getColor():MCRedBlackColor { return this.color }

    public getSize():number { return this.size }



}