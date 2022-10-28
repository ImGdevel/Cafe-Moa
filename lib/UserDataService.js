import { deletefield, dbService } from "../FireServer";
import { getCurrentUserId, getUserId } from "./AuthService";
const UserDatabase = dbService.collection("User");

/*
현재 세팅된 기능
1. 회원 가입과 동시에 계정이 생성됩니다. (여기서 "계정"은 firestore에서 "User" 안에 생성될 문서들을 말합니다.)
2. 위 기능은 이미 구현되어 있습니다. 함수 이름은 createUserProfile 입니다. 회원가입을 하고 계정을 생성하시면 (API 꼭 자기꺼로 변경!) 
    본인 firestore 안에 User항목에 유저 데이터가 들어간게 보입니다.
3. getCurrentUserId를 하시면 현재 로그인한 유저의 ID를 가져오실수 있습니다.


UserDataService에 궁극적 목표는 다음과 같습니다.
1. UserData에는 [개인정보] [현재 예약정보] [찜 카페] [과거 예약내역] [평가내역] 입니다.
    - 현재 당장 구현해햐 하는 것은 [개인정보]와 [현재 예약정보] 두가지 항목입니다. 나머지는 추후 제작합니다.
2. 개인 정보는 수정이 가능해야합니다.
3. 예약 완료시 UserData에 자신이 예약한 카페 UID와 예약시간, 예약 좌석번호를 저장해야합니다.
4. 홈화면 혹은 예약 확인 페이지에 들어가면 유저 데이터(예약 내역)을 가져와야 합니다. 
5. 나중에 체크 아웃시에는 예약 했던 정보를 모두 삭제 해야합니다.

굳이 클래스로 만들지 않아도 됩니다.

다음 목표를 위해 구현해야하는 함수는 다음과 같습니다.
1. 서버에서 유저 프로필 내역을 받아오는 함수 (리턴값은 리터럴 겍체 형태나 배열 형태든 아무거나 좋습니다.)
2. 메게변수(cafeID,시간,좌석번호)를 주었을 때 서버 유저데이터에 추가할 함수
3. 서버에서 유저 데이터 : 예약 내역 을 가져오는 함수
4. 서버에서 유저 데이터 : 예약 내역 을 지우는 함수

유의사항
UserDatabase.doc(유저UID).update() 기존에 대이터에 추가합니다. 이름이 같으면 업데이트합니다. (예약 내역처럼 일부분만 갱신가능 예시 참고)
UserDatabase.doc(유저UID).set()은 기존에 있던 내용을 아예 덮어 씌우니 쓰는걸 권장하지 않습니다. (유저 id부터 모두 첨부터 다시 써야함)


서버에서 불러오는 데이터가 있는 함수 선언은 무조건 anync가 그리고 호출할땐 await를 써야합니다.
비동기 함수는 위와 같은 규칙을 지켜야하며 안하면 오류납니다.
주로 Promise 오류메세지가 그 유형입니다. (consloe.log 잘못 호출해도 Promise뜨긴함)
*/



/** 유저 프로필 등록 (이름 , 아이디, 이메일, 비밀번호) */
export async function createUserProfile(name, id, email, password){
    let userId = id;
    if(userId == null){ //유저 아이디를 안 넣었다면 갱신
        userId = await getUserId();
    }
    await UserDatabase.doc(userId).set({
        uid: userId,
        Name: name,
        email: email,
        password: password,
    });
}

/** 유저 정보 수정 */
export async function updateUserProfile(data){
    userId = await getUserId();
    UserDatabase.doc(userId).update(data);
}

/** 예약 정보를 유저정보로 보냅니다: (cafeId: 카페id, seat_number: 좌석번호 ) */
export async function sendReservetionToUser(_cafeId, _time, _seatNumber){ //샘플 미구현
    userId = await getCurrentUserId(); 
    UserDatabase.doc(userId).update({
        reservation : {
            cafeId : _cafeId,
            time : _time,
            seatNumber : _seatNumber,
        }
    });
}

/** 유저 데이터를 가져옵니다. 샘플: 미구현 */
export async function getUserProfile(){ 
    userId = await getCurrentUserId();
    let UserData;
    await UserDatabase.doc(userId).onSnapshot((data)=>{
        UserData = data.data(); 
    }); 
    return UserData;
}

/** 서버에서 예약 내역 가져옴 */
export async function getReservetionToUser(){
    userId = await getCurrentUserId(); 
    let UserReData;
    await UserDatabase.doc(userId).onSnapshot((data)=>{
        UserReData = [
            {
                cafeId: data.data.reservation.cafeId,
                time: data.data.reservation.time, 
                seatNumber: data.data.reservation.seatNumber,
            }
        ]
        /**UserReData = data.data.reservation;*/ //안 되나?
    });
    return UserReData;
    // UserReData[0].cafeid 처럼 사용하시면 됩니당
}

/** 서버에서 예약 내역 삭제 */
export async function deleteReservationToUser(){ 
    userId = await getCurrentUserId();
    // reservation 필드 삭제
    await UserDatabase.doc(userId).delete.update({
        reservation: {
            cafeId: deletefield(),
            time: deletefield(),
            seatNumber: deletefield(),
            //time: FieldValue.delete() //원래
        }
    });
    /*
    // 위 실행 불가인 경우 아래 코드로 대체
    await UserDatabase.doc(userId).update({
        cafeId = null,
        time = null,
        seatNumber = null,
    })*/
    
    /*await UserDatabase.doc(userId).delete(); // 문서 자체 삭제*/
    /*let userRe = await UserDatabase.where('reservation', "==", _reservation); // 해당 내역 찾기 //where 반복해서 하나씩 가능*/

    /*await UserDatabase.doc(userId).isEqual(_cafeId).isEqual(_time).isEqual(_seatNumber)*/
}