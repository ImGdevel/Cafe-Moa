import { BinaryTree } from "./DataStructure/BinaryTree";

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
    
    checkSeat(time, data){
        if(time < this.startTime) return;
        return this.timeArray[time-this.startTime].find({seat:data})
    }
    
    /** 예약 취소 */
    deleteSeat(time, data){
        if(time < this.startTime) return;
        this.timeArray[time-this.startTime].delete({seat:data});
        console.log(this.timeArray[time-this.startTime])
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

    /** TimeTable을 data포멧으로 업데이트 합니다. */
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
        this.timeArray[time-this.startTime].root = new SeatTable();
    }
}

class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
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

    find(data){
        let node = this.root;
        if(node == null) return false;
        while(node != null){
            if(node.data.seat === data.seat){
                return node.data.uid;
            }
            else if(node.right !== null && node.data.seat < data.seat){
                node = node.right;
            }
            else if(node.left !== null && node.data.seat > data.seat){
                node = node.left;
            }else{
                return false;
            }
        }
        return false;
    }

    

    serchNode(data){
        let parent = this.root;
        let child = this.root;
        while(child !== null){
            if(data.seat > child.data.seat){
                parent = child;
                child = child.left;
            }
            else if(data.seat < child.data.seat){
                parent = child;
                child = child.right;
            }
            else return parent === child ? [parent, null]:[parent, child];
        }
    }

    delete(data){
        let findNode = this.serchNode(this.root, data);
        let parent = findNode[0]; //첫번째는 삭제할~노드
        let child = findNode[1] === null ? parent : findNode[1]; //자식은 없다면 부모~
        const root = child; 
        //뿌리는 child

        if(child.left === null && child.right === null){ //오른쪽 왼쪽 모두 비어있다면 (꼬리노드)
            parent.data.seat > child.data.seat ? parent.left = null : parent.right = null; //더 큰쪽을 삭제
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


}