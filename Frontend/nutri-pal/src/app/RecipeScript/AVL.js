
class Node {
    constructor(recipe, rank) {
        this.rank = rank
        this.recipe = recipe
        this.height = 1
        this.left = null
        this.right = null
    }
}

class AVL {
    constructor() {
        this.root = null
        this.size = 0
    }

    getSize() {
        return this.size
    }

    getHeight(node) {
        if (node == null) {
            return 0
        }

        return node.height
    }

    bigger(num1, num2) {
        if (num1 > num2) {
            return num1
        } else {
            return num2
        }
    }

    rightRotation(node) {
        var leftNode = node.left
        var LRnode = leftNode.right

        leftNode.right = node
        node.left = LRnode

        node.height = this.bigger(this.getHeight(node.left), this.getHeight(node.right)) + 1
        leftNode.height = this.bigger(this.getHeight(leftNode.left), this.getHeight(leftNode.right)) + 1

        return leftNode;
    }

    leftRotation(node) {
        var rightNode = node.right
        var RLnode = rightNode.left

        rightNode.left = node
        node.right = RLnode

        node.height = this.bigger(this.getHeight(node.left), this.getHeight(node.right)) + 1
        rightNode.height = this.bigger(this.getHeight(rightNode.left), this.getHeight(rightNode.right)) + 1

        return rightNode
    }

    getBalance(node) {
        if (node == null) {
            return 0
        }

        return this.getHeight(node.left) - this.getHeight(node.right)
    }

    insert(root, node) {
        this.size += 1
        if (root == null) {
            return new Node(node.recipe, node.rank)
        }

        if (node.rank < root.rank) {
            root.left = this.insert(root.left, node)
        }
        else if (node.rank > root.rank) {
            root.right = this.insert(root.right, node)
        }
        else {
            return root
        }

        root.height = this.bigger(this.getHeight(root.left), this.getHeight(root.right)) + 1

        var balance = this.getBalance(root)

        if (balance > 1 && node.rank < root.left.rank) {
            return this.rightRotation(root)
        }

        if (balance < -1 && node.rank > root.right.rank) {
            return this.leftRotation(root)
        }

        if (balance > 1 && node.rank > root.left.rank) {
            root.left = this.leftRotation(root.left)
            return this.rightRotation(root)
        }

        if (balance < -1 && node.rank < root.right.rank) {
            root.right = this.rightRotation(root.right)
            return this.leftRotation(root)
        }

        return root
    }

    getTop(node) {
        if (node === null) {
            return node
        }
        while (node.right !== null) {
            node = node.right
        }
        return node
    }

    getSmallest(node) {
        while (node.left != null) {
            node = node.left
        }

        return node
    }

    deleteTop(root) {
        if (root == null) {
            return root
        }

        if (root.right !== null) {
            root.right = this.deleteTop(root.right)
        } else {
            if ((root.left == null) || (root.right == null)) {
                let temp = null
                if (temp == root.left) {
                    temp = root.right
                } else {
                    temp = root.left
                }

                if (temp == null) {
                    temp = root
                    root = null
                } else {
                    root = temp
                }
            } else {
                let temp = this.getSmallest(root.right)

                root.rank = temp.rank

                root.right = this.deleteTop(root.right, temp.rank)
            }
        }

        if (root == null) {
            return root
        }

        root.height = this.bigger(this.getHeight(root.left), this.getHeight(root.right)) + 1

        let balance = this.getBalance(root)

        if (balance > 1 && this.getBalance(root.left) >= 0) {
            return this.rightRotation(root)
        }

        if (balance > 1 && this.getBalance(root.left) < 0) {
            root.left = this.leftRotation(root.left)
            return this.rightRotation(root)
        }

        if (balance < -1 && this.getBalance(root.right) <= 0) {
            return this.leftRotation(root)
        }

        if (balance < -1 && this.getBalance(root.right) > 0) {
            root.right = this.rightRotation(root.right)
            return this.leftRotation(root)
        }

        return root
    }
}

module.exports = { AVL, Node }
