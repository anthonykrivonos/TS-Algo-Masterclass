import { MCTree, MCTreeNode, MCTreeNodes } from '../trees-main';

export class MCTrie extends MCTree<string> {

    /**
     * Value of the root of the trie.
     */
    private static ROOT_VALUE = '*'

    constructor() {
        super(new MCTreeNode(MCTrie.ROOT_VALUE))
    }

    public addWord(word:string) {
        const chars = word.split('')
        let node = this.root as MCTrieNode
        let score = 0
        chars.forEach((char) => {
            if (node != null) {
                if (!node.hasChild(char)) {
                    node.addChild(new MCTrieNode(char, ++score))
                }
                node = node.getChild(char) as MCTrieNode
            }
        })
    }

    public getAutocompleteNextChar(word:string):string {
        const chars = word.split('')
        let node = this.root as MCTrieNode
        for (const char of chars) {
            if (node != null) {
                node = node.getChild(char) as MCTrieNode
            } else {
                return ''
            }
        }
        return node && node.getHighestScoringChild() ? node.getHighestScoringChild()!.getValue() : ''
    }

}

export type MCTrieNodes = {
    [nodeKey:string]: MCTrieNode | null;
}

export type MCTrieNodeArray = Array<MCTrieNode>

export class MCTrieNode extends MCTreeNode<string> {

    /**
     * Depth score.
     */
    private score:number

    constructor(char:string, score:number, children?:MCTrieNodes) {
        super(char, children)
        this.score = score
    }

    public getScore() { return this.score }

    public getHighestScoringChild():MCTrieNode|null {
        const children = this.getChildren() as MCTrieNodeArray
        let highestChild:MCTrieNode|null = null
        children.forEach((child:MCTrieNode) => {
            if (highestChild === null || child.getScore() > highestChild.getScore()) {
                highestChild = child
            }
        })
        return highestChild
    }

}