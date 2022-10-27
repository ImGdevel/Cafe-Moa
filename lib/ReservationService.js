import { dbService } from "../FireServer";
import { TimeTable } from "./TimeTable";

const SeatDatabase = dbService.collection("Seat");

/** 현 카페의 모든 좌석 정보를 가져옵니다. */
export async function loadSeatDataBase(seatId,start = 9,end = 22){
    
    SeatDatabase.doc(seatId).onSnapshot((doc)=>{
        console.log(doc.data());
    })
    let timeTable = new TimeTable(start,end);
    return SeatList;
}

/** 최초 카페 좌석 데이터 테이블을 생성합니다. */
export async function createNewSeatData(start, end){
    const id = await SeatDatabase.add({
        Table: [],
        Time:{},
        start: start,
        end: end,
    }).catch((err)=>{
        console.log("에러",err)
    })
    console.log(id.id)
    return id;
}

/** 좌석 예약 : ( 시간 번호, 좌석 번호 ) */
export async function doSeatReservation(seatId ,time, number){
    /*좌석 업데이트*/
    



}

export async function UpdateSeatDataBase(seatId,table){
    var temp = new TimeTable()
    temp = table;
    var datas = temp.getSeatDataAll();
    console.log("다음 좌석 정보를 업데이트 합니다.");
    SeatDatabase.doc(seatId).update({
        time: datas,
    }).catch(()=>{
        console.log("좌석 정보 업로드를 실패 하였습니다.")
    })
}