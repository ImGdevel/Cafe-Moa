import { BinaryTree, Node } from "./DataStructure/BinaryTree";


export class TimeTable{
    /** 시간대별로 예약 테이블 생성 */
    constructor(startTime = 9, endTime = 22){
        this.startTime = startTime; //영업 시작 시간
        this.endTime = endTime; // 영업 종료시간
        this.timeArray = [];
        for(var i=0; i<endTime; i++){
            this.timeArray[i] = new SeatTable();
        }
    }
    /** 특정시간에 좌석번호를 삽입합니다.: ( time : 시간(0~23) , data : {id: 유저아이디, number : 좌석 정보}) */
    insertSeat(time,data){
        if(time < this.startTime) return;
        this.timeArray[time-this.startTime].insert(data);
    }
    
    /** 특정 좌석 탐색 */
    checkSeat(time, data){
        if(time < this.startTime) return;
        return this.timeArray[time-this.startTime].search({seat:data});
    }

    /** 예약 */
    changeState(time,data){
        this.timeArray[time-this.startTime].changeState({seat:data});
    }
    
    /** 예약 취소 */
    deleteSeat(time, data){
        if(time < this.startTime) return;
        this.timeArray[time-this.startTime].remove({seat:data});
    }

    /** 특정시간대의 모든 좌석 데이터를 가져옵니다. => return 좌석[] */
    getSeatDataFromTime(time){
        if(time < this.startTime) return;
        this.timeArray[time-this.startTime].preorderResult = [];
        this.timeArray[time-this.startTime].preorder(this.timeArray[time-this.startTime].root);
        //console.log("데이터 전",this.timeArray[time-this.startTime].preorderResult);
       
        return this.timeArray[time-this.startTime].preorderResult;
    }

    /** 특정시간대의 예약/배정 좌석 데이터를 가져옵니다. => return 좌석[] */
    getSeatDataFromTimeCom(time, comp = false){
        //console.log("시간", time, "상태", comp)
        //console.log(JSON.stringify(this.timeArray[time-this.startTime], null, 2))
        this.timeArray[time-this.startTime].inorderResult = []
        //console.log("시간",time ,this.timeArray[time-this.startTime].inorderResult)
        this.timeArray[time-this.startTime].inorderRev(this.timeArray[time-this.startTime].root, comp);

        //console.log("시간",time ,this.timeArray[time-this.startTime].inorderResult)
        return this.timeArray[time-this.startTime].inorderResult;
    }

    /** 모든 시간대의 모든 좌석 데이터를 가져옵니다. => return 시간[좌석[]] */
    getSeatDataAll(){
        let datas = new Array();
        for(var i=this.startTime; i<this.endTime;i++){
            //console.log(i,"시 = :",this.getSeatDataFromTime(i));
            datas.push({ seat : this.getSeatDataFromTime(i)})
        }
        return datas;
    }

    /** TimeTable을 data포멧으로 업데이트 합니다. */
    loadDateTable(data){
        var time = this.startTime;
        data.forEach((doc)=>{
            var docs = doc.seat;
            docs.forEach((index)=>{
                this.insertSeat(time ,index);
            })
            time++;
        })
    }

    /** 특정 시간대 좌석 정보를 초기화 합니다. */
    resetSeat(time){
        this.timeArray[time-this.startTime].root = null;
        this.timeArray[time-this.startTime].root = new SeatTable();
    }
}

class SeatTable extends BinaryTree{
    constructor() {
        super();
    }

    insert(data) {
        const node = new Node(data);
        let current = this.root;
        if (!current) {
            this.root = node;
            return node;
        }
        while (true) {
            if (data.seat < current.data.seat) {
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

    search(data) {
        let current = this.root;
        while (current) {
            //console.log(current.data.seat, ":" ,data.seat, "=>", current.data.seat == data.seat)
            if (current.data.seat == data.seat) {
                //console.log("찾았습니다.");
                return current;
            } else {
                if (data.seat < current.data.seat) {
                    current = current.left;
                } else {
                    current = current.right;
                }
            }
        }
        return false;
    }

    changeState(data) {
        let current = this.root;
        while (current) {
            if (current.data.seat == data.seat) {
                current.data.state = true;
                return current;
            } else {
                if (data.seat < current.data.seat) {
                    current = current.left;
                } else {
                    current = current.right;
                }
            }
        }
        return false;
    }

    removeNode(node, data) {
        let searched = false;
        let parent = null;
        let current = node;
        while (current) {
            if (current.data.seat == data.seat) {
                searched = true;
                break;
            } else {
                if (data.seat < current.data.seat) {
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
            if (parent.data.seat < current.data.seat) {
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
                if (current.data.seat < this.root.data.seat){
                    this.root.left = current.left;
                    return this.root.left;
                }
                else {
                    this.root.right = current.left;
                    return this.root.right;
                }
            }
            else{
                if (current.data.seat < parent.data.seat) {
                    parent.left = current.left;
                } else {
                    parent.right = current.left;
                }
            }            
        }
        else if (!current.left && current.right) {
            // root
            if (ParentFlag === true) {
                if (current.data.seat < this.root.data.seat){
                    this.root.left = current.left;
                    return this.root.left;
                }
                else {
                    this.root.right = current.left;
                    return this.root.right;
                }
            }
            else{
                if (current.data.seat < parent.data.seat) {
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
                this.root.data.seat = target.data.seat;
                target = null;
            }
            else if (current.data.seat < parent.data.seat) {
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
    preorderRev(node, comp = false){
        if(node !== null){
            if(node.data.state == comp){
                this.preorderResult.push(node.data);
            }
            this.preorderRev(node.left,comp);
            this.preorderRev(node.right,comp);
        }
    }
    //중위 순회
    inorderRev(node,comp = false){
        if(node !== null){
            this.inorderRev(node.left, comp);
            //console.log(node.data,"좌석은", node.data.state ,"이고", comp, "이다.");
            if(node.data.state == comp){
                this.inorderResult.push(node.data);
            }
            this.inorderRev(node.right,comp);
        }
    }

    // BinaryTree 메소드 그대로 가져옴
}