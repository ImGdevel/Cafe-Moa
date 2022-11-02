import { dbService } from "../FireServer";
import { getCurrentUserId } from "./AuthService";
import { TimeTable } from "./TimeTable";
const SeatDatabase = dbService.collection("Seat");

export class ReservationService{
    constructor (seatId){
        this.open = null;
        this.close = null;
        this.timeTable = new TimeTable();
        this.seatId = seatId;
        this.isLoad = false;
    }

    /** 현 카페의 모든 좌석 정보를 가져옵니다. */
    async loadSeatDataBase(){
        await SeatDatabase.doc(this.seatId).get().then((doc)=>{
            var seat = doc.data()
            this.open = seat.start;
            this.close = seat.end;
            this.timeTable = new TimeTable(seat.start,seat.end);
            this.timeTable.loadDateTable(seat.Table);
            this.isLoad = true;
        }).catch((err)=>{
            console.log("좌석내역을 불러오는데 실패하였습니다.",err)
        })
        this.timeTable
    }

    /** 현 시간대 좌석데이터 : 리턴값 배열 */
    getSeatDataOnTime(time){
        return this.timeTable.getSeatDataFromTime(time);
    }

    /** 좌석 예약 : ( 시간 번호, 좌석 번호, 예약하는 사람 ) */
    async doSeatReservation(time,number,uid){
        if(!this.isLoad) return;
        await this.loadSeatDataBase();
        let uids = uid;
        
        if(uids == null){
            uids = await getCurrentUserId();
        }
        
        if(!this.timeTable.checkSeat(time,number)){ // 예약이 가능하다면
            this.timeTable.insertSeat(time,{seat:number, uid:uids});
            this.UpdateSeatDataBase();
            return true;
        }else{
            console.log("이미 예약된 자리입니다.");
            return false;
        }
    }

    /** 좌석 예약 취소 : (시간, 좌석 번호)  */
    async doSeatCancel(time,number){
        if(!this.isLoad) return;
        console.log(this.timeTable.getSeatDataFromTime(time))
        if(null != this.timeTable.checkSeat(time,number)){ // 취소할 좌석이 존재하다면
           // console.log("삭제 시도...")
            this.timeTable.deleteSeat(time,number);
           // console.log("삭제후",this.timeTable.getSeatDataFromTime(time))
        }
        this.UpdateSeatDataBase();
    }

    async UpdateSeatDataBase(){
        if(!this.isLoad) return;

        var table = this.timeTable.getSeatDataAll();
        SeatDatabase.doc(this.seatId).update({
            Table: table,
            start: this.open,
            end: this.close,
        }).catch(()=>{
            console.log("좌석 정보 업로드를 실패 하였습니다.",err)
        })
    }
}

/** 최초 카페 좌석 데이터 테이블을 생성합니다. */
export async function createNewSeatData(start, end){
    const id = await SeatDatabase.add({
        Table: [],
        start: start,
        end: end,
    }).catch((err)=>{
        console.log("좌석데이터 포멧을 생성하는데 실패하였습니다",err)
    })
    return id.id;
}