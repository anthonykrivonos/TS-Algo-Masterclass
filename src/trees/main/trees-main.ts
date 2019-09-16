export class MCTree<T extends string> {

    public root?:MCTreeNode<T>

    constructor(root?:MCTreeNode<T>) {
        this.root = root
    }

}

export type MCTreeNodes<T extends string> = {
    [nodeKey:string]: MCTreeNode<T> | null;
}

export type MCTreeNodeArray<T extends string> = Array<MCTreeNode<T>>

/**
 * Node with multiple children having unique values.
 */
export class MCTreeNode<T extends string> {

    private value:T

    private children:MCTreeNodes<T>

    constructor(value:T, children:MCTreeNodes<T> = {}) {
        this.value = value
        this.children = children
    }

    public getValue() {
        return this.value
    }

    public hasChild(value:T):boolean {
        return this.getChild(value) != null
    }

    public getChild(value:T) {
        return this.children[value.toString()] as MCTreeNode<T> | null
    }

    public getChildren():MCTreeNodeArray<T> {
        return ((Object.values(this.children).filter(c => c != null) || []) as MCTreeNodeArray<T>)
    }

    public addChild(node: MCTreeNode<T>) {
        this.children[node.toString()] = node
    }

    public removeChild(value:T):MCTreeNode<T> | null {
        if (this.hasChild(value)) {
            this.children[value.toString()] = null
        }
        return null
    }

    public toString():string {
        return this.value.toString()
    }

}