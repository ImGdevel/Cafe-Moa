// 노드 구현 위한 노드 클래스
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class BinaryTree {
    constructor() {
        this.root = null;
        this.preorderResult = [];
        this.inorderResult = [];
        this.postorderResult = [];
    }

    /** 삽입 */
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
    
    //삭제
    delete(key){
        this.root = this.removeNode(this.root, key);
    } 
    removeNode(node, key){
        if(node === null){
            return null;
        }else if(key < node.key){
            node.left = this.removeNode(node.left, key);
            return node;
        }else if(key > node.key){
            node.right = this.removeNode(node.right, key);
            return node;
        }else{ //key === node.key
            if(node.left === null && node.right === null){
                node = null;
                return node;
            }
            if(node.left === null){
                node = node.right;
                return node;
            }else if(node.right === null){
                node = node.left;
                return node;
            }
            let aux = this.findMinNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
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