// 노드 구현 위한 노드 클래스
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// 좌석 예약 클래스
export class BinaryTree {
    constructor() {
        this.root = null;
        this.preorderResult = [];
        this.inorderResult = [];
        this.postorderResult = [];
    }

    // 삽입
    insert(data){
        const insertNode = this.insertKey(this.root, data);
        this.root = insertNode;
    }
    insertKey(node, data){
        const root = node;
        const newNode = new Node(data);
        if(root === null){
            return newNode;
        }

        if(data < root.data){
            root.left = this.insertKey(root.left, data);
            return root;
        }
        else if(data > root.data){
            root.right = this.insertKey(root.right, data);
            return root;
        }
        else{
            return node;
        }
    }

    // 탐색
    serchNode(data){
        let parent = this.root;
        let child = this.root;
        while(child !== null){
            if(data < child.data){
                parent = child;
                child = child.left;
            }
            else if(data > child.data){
                parent = child;
                child = child.right;
            }
            else return parent === child ? [parent, null]:[parent, child];
        }
    }

    // 삭제 
    delete(data){
        let findNode = this.serchNode(this.root, data);
        let parent = findNode[0];
        let child = findNode[1] === null ? parent : findNode[1];
        const root = child;

        if(child.left === null && child.right === null){
            parent.data > child.data ? parent.left = null : parent.right = null;
        }
        else if(child.left===null || child.right === null){
            parent = child;
            if(parent.left != null){
                child = child.left;
                root.data = child.data;
                parent.left = null;
            }
            else {
                child = child.right;
                root.data = child.data;
                parent.right = null;
            }
        }
        else if(child.left != null && child.right != null){
            parent = child;
            child = child.right;
            let flag = true;

            while(child.left !== null && child.right !== null){
                flag = false;
                parent = child;
                child = child.left;
            }
            root.data = child.data;
            flag === true ? parent.right = null : parent.left = null;
        }
    }

    // 전위순회
    preorder(node){
        if(node !== null){
            this.preorderResult.push(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
    // 중위순회
    inorder(node){
        if(node !== null){
            this.inorder(node.left);
            this.inorderResult.push(node.data);
            this.inorder(node.right);
        }
    }
    // 후위순회
    postorder(node){
        if(node !== null){
            this.postorder(node.left);
            this.postorder(node.right);
            this.postorderResult.push(node.data);
        }
    }
}