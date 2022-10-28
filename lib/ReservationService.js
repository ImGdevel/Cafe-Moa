import { dbService } from "../FireServer";
import { TimeTable } from "./TimeTable";
const SeatDatabase = dbService.collection("Seat");

export class ReservationService{
    constructor (seatId){
        this.open = null;
        this.close = null;
        this.timeTable = new TimeTable();
        this.seatId = seatId;
        loadSeatDataBase();
    }

    /** 현 카페의 모든 좌석 정보를 가져옵니다. */
    async loadSeatDataBase(){
        await SeatDatabase.doc(this.seatId).get().then((doc)=>{
            var seat = doc.data()
            this.open = seat.start;
            this.close = seat.end;
            this.timeTable = new TimeTable(seat.start,seat.end);
            this.timeTable.loadDateTable(seat.Table);
        }).catch((err)=>{
            console.log("좌석내역을 불러오는데 실패하였습니다.",err)
        })
        this.timeTable
    }
    
    /** 좌석 예약 : ( 시간 번호, 좌석 번호 ) */
    async doSeatReservation(time,number){
        await loadSeatDataBase();
        console.log(this.timeTable.checkSeat())
        if(!this.timeTable.checkSeat()){ // 예약이 가능하다면
            this.timeTable.insertSeat(time,number);
        }
        this.UpdateSeatDataBase();
    }

    /** 좌석 예약 취소 : (시간, 좌석 번호)  */
    async doSeatCancel(time,number){

        if(this.timeTable.checkSeat()){ // 취소할 좌석이 존재하다면
            this.timeTable.deleteSeat(time,number);
        }
        this.UpdateSeatDataBase();
    }

    /** 현 자료구조를 서버에 업로드 */
    async UpdateSeatDataBase(){
        var table = this.timeTable.getSeatDataAll();
        SeatDatabase.doc(seatId).update({
            Table: table,
            start: this.open,
            end: this.close,
        }).catch(()=>{
            console.log("좌석 정보 업로드를 실패 하였습니다.")
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