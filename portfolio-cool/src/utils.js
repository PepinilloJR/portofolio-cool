export class DirectoryTree {

    constructor(father, directory_, children) {
        this.father = father;
        this.directory = directory_;
        this.children = children // this 
        this.directoryName = directory_?.id.split(" ")[0]
    }

    assingChildren(child) {
        const children = new DirectoryTree(this, child, [])
        this.children.push(children)
        return children
    }

}