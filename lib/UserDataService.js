import { dbService, MyDatabase } from "../FireServer";
import { getCurrentUserId } from "./AuthService";
const UserDatabase = dbService.collection("User");

export class UserDataService{
    constructor(userId){        
        this.userId = userId;
        this.name;
        this.email;
        this.password;
        this.reservation;
        this.bookmark = [];
    }

    /** 현제 로그인된 유저 데이터를 가져옵니다. */
    async loadUserId(){
        if(this.userId == null){
            this.userId = await getCurrentUserId();
            console.log("유저 ID를 불러옵니다. 현재 접속: ", this.userId);
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
    async setUserProfile(name, email, password){
        await this.loadUserId();
        userId = await getCurrentUserId();
        await UserDatabase.doc(userId).update({
            Name: name,
            email: email,
            password: password,
        })
        console.log(name + " " + email + " " + password);

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

    /** 예약 내역이 있는가? */
    
    isReserve(){
        if(this.reservation != null && this.reservation.cafeId != null  ){
            return true;
        }
        return false;
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

    /** 북마크 관련 메서드입니다. _____________________________________________*/
    /** 북마크 내역을 가져옵니다. */
    async getBookmarkToUser(){
        await this.loadUserId();
        
        let UserBookmark;
        await UserDatabase.doc(this.userId).get().then((data)=>{
            console.log(data.data())
            UserBookmark = data.data().bookmark;
        });
        return UserBookmark;
    }

    async addBookMark(cafe){
        this.bookmark.push(cafe);
        await UserDatabase.doc(this.userId).update({
            bookmark : MyDatabase.firestore.FieldValue.arrayUnion(cafe),
        })
    }

    async deletBookMark(cafe){
        const findIndex = this.bookmark.indexOf(cafe);
        if(findIndex > -1) {
            this.bookmark.splice(findIndex, 1);
        }
        await UserDatabase.doc(this.userId).update({
            bookmark : MyDatabase.firestore.FieldValue.arrayRemove(cafe),
        })
    }

    /** 받아온 카페가 북마크에 등록되어 있는지 확인합니다. */
    isBookmarked(cafe){
        let find = false;
        if(this.bookmark != null){
            this.bookmark.forEach((data)=>{
                if(cafe == data){
                    find = true;
                    return;
                }
            })
        }
        return find;
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

    getBookmark(){
        return this.bookmark;
    }

};



// 사업자용
export class BuisnessUserDataService{
    constructor(userId){        
        this.userId = userId;
        this.name;
        this.email;
        this.password;
        this.cafeId;
    }
    

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
