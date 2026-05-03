export class DirectoryTree {

    constructor(father, directory_, children, files) {
        this.father = father;
        this.directory = directory_;
        this.children = children // this 
        this.directoryName = directory_?.id.split(" ")[0]
        this.files = files
    }

    assingChildren(child) {
        const children = new DirectoryTree(this, child, [])
        this.children.push(children)
        return children
    }

    assingFile(file) {
        if (!this.files) {
            this.files = [file]
        }
        this.files.push(file)
        return file
    }


    getAbsolutePath(path) {
        let path_;
        if (path) {
            path_ = this.directoryName + "/" + path
        } else {
            path_ = this.directoryName
        }

        if (!this.father) {
            return path_
        }

        return this.father.getAbsolutePath(path_)
    }


    static directoriesBuilder(element, tree, depth) {
        console.log(depth)
        // if the dom
        let depth_ = 0
        if (depth > 1000) { return }
        else { depth_ = depth + 1 }

        let firstTree;
        if (!tree) {
            firstTree = new DirectoryTree(null, document.getElementById("~"), [], [])
        }

        // the root directory should have a ~ id
        if (!element) {
            const root = firstTree.directory

            for (let i = 0; i < root.children.length; i++) {
                const child = root.children.item(i)

                if (child.id.includes("File")) {
                    const file = new TerminalFile(root, child.title, child.textContent)
                    firstTree.assingFile(file)
                    console.log(file)
                    continue
                }
                else if (!child.id.includes("Directory")) {
                    DirectoryTree.directoriesBuilder(child, firstTree)
                    continue
                }
                const children = firstTree.assingChildren(child)
                DirectoryTree.directoriesBuilder(child, children, depth_)
            }
        }
        else {
            for (let i = 0; i < element.children.length; i++) {
                const child = element.children.item(i)
                if (child.id.includes("File")) {
                    const file = new TerminalFile(tree, child.title, child.textContent)
                    tree.assingFile(file)
                    continue
                } else if (!child.id.includes("Directory")) {
                    DirectoryTree.directoriesBuilder(child, tree, depth_)
                    continue
                }
                const children = tree.assingChildren(child)
                DirectoryTree.directoriesBuilder(child, children, depth_)
            }
        }

        return firstTree;
    }

}


export class TerminalFile {

    constructor(father, name, content) {
        this.father = father;
        this.name = name;
        this.content = content // this 

    }


}