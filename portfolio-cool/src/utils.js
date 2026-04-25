export class DirectoryTree {

    constructor(father, directory, children) {
        this.father = father;
        this.directory = directory;
        this.children = children // this 
    }

    assingChildren(child) {
        const children = new DirectoryTree(this, child, [])
        this.children.push(children)
        return children
    }

}