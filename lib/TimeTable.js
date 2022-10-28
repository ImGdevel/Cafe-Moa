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
    
    /** 데이터 삭제 */
    deleteSeat(time, data){
        if(time < this.startTime) return;
        this.timeArray[time-this.startTime].delete(data);
    }

    /** 특정시간대의 모든 좌석 데이터를 가져옵니다. => return 좌석[] */
    getSeatDataFromTime(time){
        if(time < this.startTime) return;
        
        this.timeArray[time-this.startTime].preorderResult = []
        this.timeArray[time-this.startTime].preorder(this.timeArray[time-this.startTime].root);
        return this.timeArray[time-this.startTime].preorderResult;
    }
    

    /** 모든 시간대의 모든 좌석 데이터를 가져옵니다. => return 시간[좌석[]] */
    getSeatDataAll(){
        let datas = new Array();
        for(var i=this.startTime; i<this.endTime;i++){
            datas.push({ seat : this.getSeatDataFromTime(i)})
        }
        return datas;
    }

    loadDateTable(data){
        var time = this.startTime;
        data.forEach((doc)=>{
            var docs = doc.seat;
            docs.forEach((index)=>{
                this.insertSeat( time ,index);
            })
            time++;
        })
    }

    /** 특정 시간대 좌석 정보를 초기화 합니다. */
    resetSeat(time){
        this.timeArray[time-this.startTime].root = null;
        this.timeArray[time-this.startTime].root = new BinaryTree();
    }
}

class SeatTable extends BinaryTree{
    insertKey(node, data){
        const root = node;
        const newNode = new Node(data);
        if(root === null){
            return newNode;
        }

        if(data.seat < root.data.seat){
            root.left = this.insertKey(root.left, data);
            return root;
        }
        else if(data.seat > root.data.seat){
            root.right = this.insertKey(root.right, data);
            return root;
        }
        else{
            return node;
        }
    }
}