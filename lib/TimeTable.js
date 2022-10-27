import { BinaryTree } from "./DataStructure/BinaryTree";

export class TimeTable{
    /** 시간대별로 예약 테이블 생성 */
    constructor(startTime, endTime){
        this.startTime = startTime; //영업 시작 시간
        this.endTime = endTime; // 영업 종료시간
        this.timeArray = [];
        for(var i=0; i<endTime; i++){
            this.timeArray[i] = new BinaryTree();
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
        return this.timeArray;
    }

    loadDateTable(data){
        data.forEach((time)=>{
            time.forEach((index)=>{
                this.insertSeat(index);
            })
        })
    }

    saveDateTable(){
        
    }

    /** 특정 시간대 좌석 정보를 초기화 합니다. */
    resetSeat(time){
        this.timeArray[time-this.startTime].root = null;
        this.timeArray[time-this.startTime].root = new BinaryTree();
    }
}

/* 백업 예제
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