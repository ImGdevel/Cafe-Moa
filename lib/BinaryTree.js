// Tree 클래스 삭제 예정
class Tree {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    insertNode(value) {
        const childNode = new Tree(value);
        this.children.push(childNode);
    }

    containsNode(value) {
        if (this.value === value) {
            return true;
        }

        for(let i = 0; i < this.children.length; i++){
            const childNode = this.children[i];
            if(childNode.containsNode(value)) {
                return true;
            }
        }

        return false;
    }
}

class BinaryTree {
    // Node
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    // 삽입
    insert(value) {
        if (value < this.value) {
            if (this.left === null) {
                this.left = new BinaryTree(value);
            }
            else {
                this.left.insert(value);
            }
        }
        else if (value > this.value) {
            if(this.right === null) {
                this.right = new BinaryTree(value);
            }
        }
    }

    // 해당 값 확인
    containes(value) {
        if (value === this.value) {
            return true;
        }
        if (value < this.value) {
            return !!(this.left && this.left.containes(value));
        }
        if (value > this.value) {
            return !!(this.right && this.right.containes(value)); 
        }
    }

    // 전위 순회
    preorder(callback) {
        callback(this.value);
        if (this.left) {
            this.left.preorder(callback);
        }
        if (this.right) {
            this.right.preorder(callback);
        }
    }

    // 중위 순회
    inorder(callback) {
        if (this.left) {
            this.left.inorder(callback);
        }
        callback(this.value);
        if (this.right) {
            this.right.inorder(callback);
        }
    }

    // 휘위 순회
    postorder(callback) {
        if (this.left) {
            this.left.postorder(callback);
        }
        if (this.right) {
            this.right.postorder(callback);
        }
        callback(this.value);
    }
}