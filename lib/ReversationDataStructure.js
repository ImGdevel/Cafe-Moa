// 예약 시간대 배열 가지고 있음
export class TimeTable {
    constructor(){
        //  9 <= hour <= 20, 하루 24시간
        this.timeArray = [];
    }

    insertOneTimeArray(value){
        this.timeArray[value - 9] = new SeatReservation();
        this.timeArray[value - 9].preorder(this.timeArray[value - 9].root); 
        return this.timeArray[value - 9].preorderResult;
        //아래 예시, 삭제 금지
        //this.getTime(value - 9); //이건 안 됨
        //this.timeArray[value - 9].insert(3);
    }

    // 해당 시간대 예약된 좌석 찾기
    getTime(value){ 
        this.timeArray[value - 9].preorderResult = [];
        this.timeArray[value - 9].preorder(this.timeArray[value - 9].root); 
        return this.timeArray[value - 9].preorderResult;
    }

    insertSeat(value, data){
        this.timeArray[value - 9].insert(data);
        this.timeArray[value - 9].preorderResult = [];
        this.timeArray[value - 9].preorder(this.timeArray[value - 9].root); 
        return this.timeArray[value - 9].preorderResult;
    }

    deleteSeat(value, data){
        this.timeArray[value - 9].delete(data);
        this.timeArray[value - 9].preorder(this.timeArray[value - 9].root); 
        return this.timeArray[value - 9].preorderResult;
    }

    resetSeat(value){
        this.timeArray[value - 9].root = null;
    }

    // 아래 함수 아마 삭제 예정
    // insertTime(){
    //     this.timeArray[0] = new SeatReservation();
    //     this.timeArray[1] = new SeatReservation();
    //     this.timeArray[2] = new SeatReservation();
    //     this.timeArray[3] = new SeatReservation();
    //     this.timeArray[4] = new SeatReservation();
    //     this.timeArray[5] = new SeatReservation();
    //     this.timeArray[6] = new SeatReservation();
    //     this.timeArray[7] = new SeatReservation();
    //     this.timeArray[8] = new SeatReservation();
    //     this.timeArray[9] = new SeatReservation();
    //     this.timeArray[10] = new SeatReservation();
    //     this.timeArray[11] = new SeatReservation();
    // }
}

// 노드 구현 위한 노드 클래스
export class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// 좌석 예약 클래스
export class SeatReservation {
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
    search(data){
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
        let findNode = this.search(this.root, data);
        let parent = findNode[0];
        let child = findNode[1] === null ? parent : findNode[1];
        const root = child;
        //console.log(this.root);

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
        //console.log(this.root);
    }

    // 전위순회, 현재 이걸로 사용중
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

// 아래는 예시, 삭제 금지
// const test = new TimeTable();
// test.insertTime();
// test.insertOneTimeArray(9);
// test.getTime(9);
// test.timeArray[0].insert(1);
// test.timeArray[0].delete(5);
// test.timeArray[0].preorder(test.timeArray[0].root);
// test.timeArray[0].postorderResult;