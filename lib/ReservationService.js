import { dbService } from "../FireServer";
import { TimeTable } from "./TimeTable";
const SeatDatabase = dbService.collection("Seat");

export class ReservationService{

}

/** 현 카페의 모든 좌석 정보를 가져옵니다. */
export async function loadSeatDataBase(seatId,start = 9,end = 22){
    let timeTable = [];
    await SeatDatabase.doc(seatId).get().then((doc)=>{
        var seat = doc.data()
        timeTable = new TimeTable(seat.start,seat.end);
        timeTable.loadDateTable(seat.Table);
        console.log("10시",timeTable.getSeatDataFromTime(10))
    })
    /*
    SeatDatabase.doc(seatId).onSnapshot((doc)=>{
        var seat = doc.data()
        timeTable = new TimeTable(seat.start,seat.end);
        timeTable.loadDateTable(seat.Table);
        console.log("10시",timeTable.getSeatDataFromTime(10))
    })
    */
    //return timeTable;
    //return new Promise((resolve) => {
    //    resolve(timeTable);
    //});
    return timeTable
}

/** 최초 카페 좌석 데이터 테이블을 생성합니다. */
export async function createNewSeatData(start, end){
    const id = await SeatDatabase.add({
        Table: [],
        start: start,
        end: end,
    }).catch((err)=>{
        console.log("에러",err)
    })
    return id.id;
}

/** 좌석 예약 : ( 시간 번호, 좌석 번호 ) */
export async function doSeatReservation(seatId ,time, number){
    let timeTable = new TimeTable(start,end);
    
}



export async function UpdateSeatDataBase(seatId,table){

    var timeTable = table.getSeatDataAll();
    SeatDatabase.doc(seatId).update({
        Table: timeTable,
        start: table.startTime,
        end: table.endTime,
    }).catch(()=>{
        console.log("좌석 정보 업로드를 실패 하였습니다.")
    })
}