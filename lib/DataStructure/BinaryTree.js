// 예약 시간대 배열 가지고 있음
/*
export class TimeTable {
    constructor(){
        //  9 <= hour <= 20, 하루 24시간
        this.timeArray = [];
    }
    
    insertOneTimeArray(value){
        this.timeArray[value - 9] = new BinaryTree();
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
}
*/
export class TimeTable{
    /** 시간대별로 예약 테이블 생성 */
    constructor(startTime, endTime){
        this.startTime = startTime; //영업 시작 시간
        this.endTime = endTime; // 영업 종료시간
        this.timeArray = [];
        for(var i=0; i<endTime; i++){
            this.timeArray = new BinaryTree();
        }
    }

    /** 특정시간에 좌석번호를 삽입합니다.: ( time : 시간(0~23) , data : {id: 유저아이디, number : 좌석 정보}) */
    insertSeat(time,data){
        if(time < this.startTime) return;

        this.timeArray[time-this.startTime].insert(data);
    }

    /** 데이터 삭제 */
    deleteSeat(time, data){
        if(time < this.startTime) return;

        this.timeArray[time-this.startTime].delete(data);
    }

    findSeat(){
        
    }

    /** 특정시간대의 모든 좌석 데이터를 가져옵니다. => return 좌석[] */
    getSeatDataFromTime(time){
        if(time < this.startTime) return;

        this.timeArray[time-this.startTime].preorderResult = [];
        this.timeArray[time-this.startTime].preorder(this.timeArray[time-this.startTime].root);
        return this.timeArray[value - 9].preorderResult;
    }

    /** 모든 시간대의 모든 좌석 데이터를 가져옵니다. => return 시간[좌석[]] */
    getSeatDataAll(){
        return this.timeArray;
    }

    /** 특정 시간대 좌석 정보를 초기화 합니다. */
    resetSeat(time){
        this.timeArray[time-this.startTime].root = null;
        this.timeArray[time-this.startTime].root = new BinaryTree();
    }

}

//분석...
//타임 테이블을 가져오고
//
// time table .... 몇시는 좌석 몇개...

// 노드 구현 위한 노드 클래스
export class Node {
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



// postorder((callback)=>{
    //     if(this.left){
    //         this.left.inorder(callback);
    //     }
    //     callback(this.data)
    //     if(this.right){
    //         this.right.inorder(callback);
    //     }
    // });

    /*inorder(root){
        if(root !== null){
            this.inorder(root.left);
            inorderResult.push(root.data);
            this.inorder(root.right);
        }
    }*/

    /*postorder(root){
        if(root !== null){
            this.postorder(root.left);
            this.postorder(root.right);
            this.postorderResult.push(root.data);
        }
    }*/

// Tree 클래스 삭제 예정
// class Tree {
//     constructor(value) {
//         this.value = value;
//         this.children = [];
//     }

//     insertNode(value) {
//         const childNode = new Tree(value);
//         this.children.push(childNode);
//     }

//     containsNode(value) {
//         if (this.value === value) {
//             return true;
//         }

//         for(let i = 0; i < this.children.length; i++){
//             const childNode = this.children[i];
//             if(childNode.containsNode(value)) {
//                 return true;
//             }
//         }

//         return false;
//     }
// }

// 이진 트리
// class BinaryTree {
//     // Node
    

//     // 삭제
//     delete(value) {
//         let removedIndex = this.search(item); // 삭제할 노드의 인덱스를 가지고 있다. 
        
//         if(this.array[removedIndex * 2] == null && this.array[(removedIndex * 2)+1] == null){
//             this.array[removedIndex] = null;
//         }else if(this.array[removedIndex*2] != null && this.array[(removedIndex*2)+1] != null){
//             let heirIndex = (removedIndex * 2) + 1; 
//             while(this.array[heirIndex] == null){
//                 heirIndex *= 2;
//             }
//             this.array[removedIndex] = this.array[heirIndex]
//             this.array[heirIndex] = null;
//         }else{
//             let childIndex = removedIndex;
//             if(this.array[(removedIndex * 2)] == null){
//                 let heirIndex = (removedIndex * 2) + 1;
//                 this.array[childIndex] = this.array[heirIndex];
//                 this.move(childIndex,heirIndex);
//             }else if(array[(removedIndex * 2) +1] == null){
//                 let heirIndex = (removedIndex * 2);
//                 this.array[childIndex] = this.array[heirIndex];
//                 this.move(childIndex,heirIndex);
//             }
//         }   
//     }

    
//     move(movedIndex, heirIndex){
//         if(this.array[heirIndex * 2] != null){
//             this.array[movedIndex * 2] = this.array[heirIndex * 2];
//             this.move(movedIndex * 2,heirIndex * 2);
//         }else{
//             this.array[heirIndex] = null;
//         }

//         if(this.array[(heirIndex * 2) +1 ] != null){
//             this.array[(movedIndex * 2) + 1] = this.array[(heirIndex * 2) +1];
//             this.move((movedIndex * 2) +1,(heirIndex * 2)+1);
//         }else{
//             this.array[heirIndex] = null;
//         }
//     }

//     // 탐색
//     search(item) {
//         let i = 1;
//         while(this.array[i] != null){
//             if(this.array[i] < item){
//                 i = (i * 2) + 1;
//             }else if(this.array[i] > item){
//                 i = i * 2;
//             }else if(this.array[i] == item){
//                 return i;
//             }
//         }  
//     }
//     // 전위 순회
//     preorder(callback) {
//         callback(this.value);
//         if (this.left) {
//             this.left.preorder(callback);
//         }
//         if (this.right) {
//             this.right.preorder(callback);
//         }
//     }

//     // 중위 순회
//     inorder(callback) {
//         if (this.left) {
//             this.left.inorder(callback);
//         }
//         callback(this.value);
//         if (this.right) {
//             this.right.inorder(callback);
//         }
//     }

//     // 후위 순회
//     postorder(callback) {
//         if (this.left) {
//             this.left.postorder(callback);
//         }
//         if (this.right) {
//             this.right.postorder(callback);
//         }
//         callback(this.value);
//     }

//     getRoot(){
//         return this.root;
//     }
    
//     // 좌석 예약 추가
//     addSeat(seatNum){
//         if(this.contains(seatNum) === true){
//             return false;
//         }
//         else{
//             if (seatNum < this.seatNum) {
//                 if (this.left === null) {
//                     this.left = new SeatReservation(seatNum);
//                 }
//                 else {
//                     this.left.insert(seatNum);
//                 }
//             }
//             else if (seatNum > this.seatNum) {
//                 if(this.right === null) {
//                     this.right = new SeatReservation(seatNum);
//                 }
//             }
//         }
//     }

//     // 탐색 위해 배열로 변환
//     toArray(){
//         const treeArray = [];
//         treeArray[0] = 0;
//         if(this.left === null){
//             treeArray[]
//         }
//     }
//     /*// 좌석 예약 여부 확인
//     search(seatNum){
//         min = 0;
//         max = length;
//     }*/
//     // 이미 좌석이 예약되었는지 확인
//     contains(seatNum) {
//         if (seatNum === this.seatNum) {
//             return true;
//         }
//         if (seatNum < this.seatNum) {
//             return !!(this.left && this.left.contains(seatNum));
//         }
//         if (seatNum > this.seatNum) {
//             return !!(this.right && this.right.contains(seatNum)); 
//         }
//     }

//     getLeft(){
//         console.log(this.seatNum);
//     }

//     // 예약된 좌석 다 보여주기
//     inorder(target){
//         if(target === null){
//             target === 1;
//         }
//         if(this.seatArray[target] !== null){
//             this.inorder(target*2);
//             console.log(this.seatArray[target]);
//             this.inorder((target*2)+1);
//         }
//     }

//     // 후위 순회
//     postorder(callback) {
//         if (this.left) {
//             this.left.postorder(callback);
//         }
//         if (this.right) {
//             this.right.postorder(callback);
//         }
//         console.log(this.seatNum);
//     }

//     /*insert(seatNum){
//         let node = new TreeNode(seatNum);
//         if(!this.root){
//             this.root = node;
//             return this;
//         }

//         let current = this.root;
//         while(current){
//             if(seatNum === current.seatNum){
//                 return;
//             }
//             if(seatNum<current.seatNum){
//                 if(!current.left){
//                     current.left=node;
//                     break;
//                 }
//                 current = current.left;
//             }
//             if(seatNum>current.right){
//                 if(!current.right){
//                     current.right = node;
//                     break;
//                 }
//                 current=current.right;
//             }
//         }
//     }*/

// }


// const test = new Time();

// test.insertTime(9);
// test.insertTime(10);

// test.timeArray[0].insert(1);
// test.timeArray[0].insert(2);
// test.timeArray[0].insert(3);
// test.timeArray[0].insert(4);
// test.timeArray[0].insert(5);

// test.timeArray[0].delete(5);

// test.timeArray[0].preorder(test.timeArray[0].root);

// test.timeArray[0].preorderResult;