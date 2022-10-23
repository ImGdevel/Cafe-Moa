import { dbService } from "../FireServer";
import { getUserId } from "./AuthService";

const UserDatabase = dbService.collection("User");

/** 유저 프로필 등록 (이름 , 아이디, 이메일, 비밀번호) */
export async function createUserProfile(name, id, email, password){
    let userId = id;
    if(userId == null){
        userId = await getUserId();
    }
    await UserDatabase.doc(userId).set({
        uid: userId,
        Name: name,
        email: email,
        password: password,
    });
}

export async function updateUserProfile(data){
    userId = await getUserId();
    UserDatabase.doc(userId).update(data);
}

/** 예약 정보를 유저정보로 보냅니다: (cafeId: 카페id, seat_number: 좌석번호 ) */
export async function sendReservetionToUser(_cafeId, _seatNumber){
    userId = await getUserId();
    UserDatabase.doc(userId).update({
        reservation : {
            cafeId : _cafeId,
            seatNumber : _seatNumber,
        }
    });
}

export async function getUserProfile(){ //유저 데이터를 가져옵니다.
    userId = await getUserId();
    let UserData;
    await UserDatabase.doc(userId).onSnapshot((data)=>{
        UserData = data.data();
    })
    return UserData;
}