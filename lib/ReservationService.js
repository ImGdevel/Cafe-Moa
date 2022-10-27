import { dbService } from "../FireServer";
import { TimeTable } from "./TimeTable";

const SeatDatabase = dbService.collection("Seat");


/** 현 카페의 모든 좌석 정보를 가져옵니다. */
export async function getSeatDataAll(seatId,start = 9,end = 22){
    let timeTable = new TimeTable(start,end);
    SeatDatabase.doc(seatId).onSnapshot((doc)=>{
        console.log(doc.data());
    })

    return SeatList;
}

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
export async function doSeatReservation(cafeId ,time, number){
    //좌석 예약을 실시한다.
    // 예약하려는 좌석이 현제 예약 중인지 확인한다.
    // 예약이 가능하다면 예약한다(데이터 베이스에 송신).
    // 실패 했다면 err
    SeatDatabase.doc(cafeId).set({
        data:data,
    })
}