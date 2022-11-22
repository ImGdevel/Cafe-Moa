import { dbService, MyDatabase } from "../FireServer";
import { getCurrentUserId } from "./AuthService";
import { List } from "./DataStructure/List";
const UserDatabase = dbService.collection("User");

export class UserDataService{
    constructor(userId){        
        this.userId = userId;
        this.name;
        this.email;
        this.password;
        this.reservation;
        this.bookmark;
        
    }

    /** 현제 로그인된 유저 데이터를 가져옵니다. */
    async loadUserId(){
        if(this.userId == null){
            console.log("현제 유저ID가 없습니다... 불러옵니다....");
            this.userId = await getCurrentUserId();
        }
    }
    
    /** 유저 프로필을 가져옵니다. */
    async getUserProfile(){
        await this.loadUserId();
        let userprofile;
        await UserDatabase.doc(this.userId).get().then((data)=>{
            userprofile = data.data(); 
            this.name = userprofile.Name;
            this.email = userprofile.email;
            this.password = userprofile.password;
            this.reservation = userprofile.reservation;
            this.bookmark = userprofile.bookmark;
        }).catch((err)=>{
            console.log("유저 프로필 불러오기를 실패 했습니다.",err);
        });
        return userprofile;
    }

    /** 유저 프로필을 설정합니다. */
    async setUserProfile(data){
        await this.loadUserId();
        UserDatabase.doc(this.userId).update(data);
    }

    /** 예약 정보를 유저에게서 가져옵니다. */
    async getReservetionToUser(){
        await this.loadUserId();
        let UserReData;
        await UserDatabase.doc(this.userId).get().then((data)=>{
            console.log(data.data())
            UserReData = data.data().reservation;
        });
        return UserReData;
    }

    /** 예약 정보를 유저에거 저장합니다. */
    async sendReservetionToUser(_cafeId, _seatId ,_time, _seatNumber){
        await this.loadUserId();
        UserDatabase.doc(this.userId).update({
            reservation : {
                cafeId : _cafeId,
                time : _time,
                seatNumber : _seatNumber,
                seatId : _seatId,
            }
        });
    }

    /**유저 데이터에서 저장된 유저 데이터를 삭제 합니다.*/
    async deleteReservationToUser(){ 
        await this.loadUserId();
        await UserDatabase.doc(this.userId).update({
            reservation : {
                cafeId : null,
                seatId : null,
                time : null,
                seatNumber : null,
            },
        })
    }

    
    async doBookmarking(cafeId){
        await UserDatabase.doc(this.userId).update({
            bookmark : MyDatabase.firestore.FieldValue.arrayUnion(cafeId),            
        })
    }

    async getBookmarking(){
        return this.bookmark;
    }

    

    getName(){
        return this.name;    
    }

    getReservetionCafe(){
        return this.reservation;
    }

    getEmail(){
        return this.email;
    }

};


/** 유저 프로필 등록 (이름 , 아이디, 이메일, 비밀번호) */
export async function createUserProfile(name, id, email, password){
    let userId = id;
    if(userId == null){ //유저 아이디를 안 넣었다면 갱신
        userId = await getCurrentUserId();
    }
    await UserDatabase.doc(userId).set({
        uid: userId,
        Name: name,
        email: email,
        password: password,
        reservation : {
            cafeId : null,
            seatId: null,
            time : null,
            seatNumber : null,
        },
        bookmark: [], 
    })

}

/** 유저 정보 수정 */
export async function updateUserProfile(data){
    userId = await getCurrentUserId();
    UserDatabase.doc(userId).update(data);
}

/** 예약 정보를 유저정보로 보냅니다: (cafeId: 카페id, seat_number: 좌석번호 ) */
export async function sendReservetionToUser(_cafeId, _seatId ,_time, _seatNumber){
    userId = await getCurrentUserId(); 
    UserDatabase.doc(userId).update({
        reservation : {
            cafeId : _cafeId,
            time : _time,
            seatNumber : _seatNumber,
            seatId : _seatId,
        }
    });
}

/** 유저 데이터를 가져옵니다. */
export async function getUserProfile(_userId){
    let userId = _userId
    if(userId == null){
        userId = await getCurrentUserId();
    }
    let UserData;
    await UserDatabase.doc(userId).get().then((data)=>{
        UserData = data.data(); 
    }).catch((err)=>{
        console.log("유저데이터 불러오기 실패",err);
    });
    return UserData;
}

/** 서버에서 예약 내역 가져옴 */
export async function getReservetionToUser(){
    userId = await getCurrentUserId(); 
    let UserReData;
    await UserDatabase.doc(userId).get().then((data)=>{
        console.log(data.data())
        UserReData = data.data().reservation; 
    });
    return UserReData;
}

/** 서버에서 예약 내역 삭제 */
export async function deleteReservationToUser(){ 
    userId = await getCurrentUserId();
    await UserDatabase.doc(userId).update({
        reservation : {
            cafeId : null,
            seatId : null,
            time : null,
            seatNumber : null,
        },
    })
}
