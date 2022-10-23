import { dbService } from "../FireServer";

const SeatDatabase = dbService.collection("Seat");

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

/** 현 카페의 모든 좌석 정보를 가져옵니다. */
export async function getSeatDataAll(cafeId){
    let SeatList;//풀어낼 데이터 변수

    SeatDatabase.doc(cafeId).onSnapshot((doc)=>{
        console.log(doc.data());
    })

    return SeatList;
}

