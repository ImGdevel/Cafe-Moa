// 이진 트리 테스트 용입니다.
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.preorderResult = [];
    }

    insert(data) {
        const node = new Node(data);
        let current = this.root;
        if (!current) {
            this.root = node;
            return node;
        }
        while (true) {
            if (data < current.data) {
                if (current.left) {
                current = current.left;
                } else {
                current.left = node;
                break;
                }
            } else {
                if (current.right) {
                    current = current.right;
                    } else {
                    current.right = node;
                    break;
                }
            }
        }
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

    search(data) {
        let current = this.root;
        while (current) {
            if (current.data === data) {
                return current;
            } else {
                if (data < current.data) {
                    current = current.left;
                } else {
                    current = current.right;
                }
            }
        }
        return false;
    }
    searchNode(node, data){
        let parent = node;
        let child = node;
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
    
    remove(data){
        this.removeNode(s.root, data);
    }
    removeNode(node, data) {
        let searched = false;
        let parent = null;
        let current = node;
        while (current) {
            if (current.data === data) {
                searched = true;
                break;
            } else {
                if (data < current.data) {
                    parent = current;
                    current = current.left;
                } else {
                    parent = current;
                    current = current.right;
                }
            }
        }

        if (!searched) return false;
        let ParentFlag = false;
        let leftFlag = true;
        // root
        if (parent === null) {
            ParentFlag = true;
        }
        else{
            if (parent.data < current.data) {
                leftFlag = false;
            }
        }

        // 1. No Child
        if (!current.left && !current.right) {
            // root 삭제
            if(ParentFlag){
                this.root = null;
            }
            else{
                if (leftFlag) {
                    parent.left = null;
                } else {
                    parent.right = null;
                }
            }
            return;
        }

        // 2. One Child
        else if (current.left && !current.right) {
            // root
            if (ParentFlag === true) {
                if (current.data < this.root.data){
                    this.root.left = current.left;
                    return this.root.left;
                }
                else {
                    this.root.right = current.left;
                    return this.root.right;
                }
            }
            else{
                if (current.data < parent.data) {
                    parent.left = current.left;
                } else {
                    parent.right = current.left;
                }
            }            
        }
        else if (!current.left && current.right) {
            // root
            if (ParentFlag === true) {
                if (current.data < this.root.data){
                    this.root.left = current.left;
                    return this.root.left;
                }
                else {
                    this.root.right = current.left;
                    return this.root.right;
                }
            }
            else{
                if (current.data < parent.data) {
                    parent.left = current.right;
                } else {
                    parent.right = current.right;
                }
            }
        }

        // 3. Two Children
        else {
            // root
            if (ParentFlag === true) {
                let target = this.root.right;
                let temp = this.root.right;
                while(target.left){
                    temp = target;
                    target = target.left;
                }
                if (target.right) {
                    this.root.right.left = this.root.left;
                    this.root = this.root.right;
                    return;
                }
                this.root.data = target.data;
                target = null;
            }
            else if (current.data < parent.data) {
                let target = current.right;
                let targetParent = current.right;
                while (target.left) {
                    targetParent = target;
                    target = target.left;
                }
                if (targetParent === target) {
                parent.left = target;
                target.left = current.left;
                current.right = null;
                } else {
                if (target.right) {
                    targetParent.left = target.right;
                } else {
                    targetParent.left = null;
                }
                parent.left = target;
                target.right = current.right;
                target.left = current.left;
                }
        }            
        // parent의 오른쪽에 current가 있는 경우
        else {
            let target = current.right;
            let targetParent = current.right;
            while (target.left) {
                targetParent = target;
                    target = target.left;
            }
            if (targetParent === target) {
                parent.right = target;
                target.left = current.left;
                    current.right = null;
            } else {
                if (target.right) {
                    targetParent.left = target.right;
                } else {
                    targetParent.left = null;
                }
                parent.right = target;
                target.right = current.right;
                target.left = current.left;
                }
            }
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
}


class SeatTable extends BinaryTree{
    constructor() {
        super();
    }
    // BinaryTree 메소드 그대로 가져옴
}



// insert, search, remove 사용 추천
// 트리 확인하고 싶으면 s.root 처럼 사용하면 좋음
// 사용예시
// s.insertKey(s.root, 1)
// const s = new SeatTable();
// s.insert(5);
// s.insert(10);
// s.insert(1);
// s.insert(2);
// s.insert(0);
// s.insert(11);