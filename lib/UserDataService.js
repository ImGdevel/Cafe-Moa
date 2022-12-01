import { dbService, MyDatabase } from "../FireServer";
import { getCurrentUserId } from "./AuthService";
const UserDatabase = dbService.collection("User");
const BuisnessUserDatabase = dbService.collection("BuisnessUser");

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

    addReview(cafe,review){
        
        UserDatabase.doc(this.userId).update({
            review : MyDatabase.firestore.FieldValue.arrayUnion({cafe,review}),
        })
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

    getBookmarks(){
        return this.bookmark;
    }

    getId(){
        return this.userId;
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
        review: [],
        bookmark: [],
    })

}



// 사업자용
// 사업자용
export class BuisnessUserDataService{
    constructor(userId){        
        this.userId = userId;
        this.name;
        this.email;
        this.password;
        this.cafeId;
    }

    async loadBuisnessUserId(){
        if(this.userId == null){
            console.log("현재 비즈니스유저ID가 없습니다... 불러옵니다....");
            this.userId = await getCurrentUserId();
        }
    }
    
    async getBuisnessUserProfile(){
        await this.loadUserId();
        let buisnessuserprofile;
        await BuisnessUserDatabase.doc(this.userId).get().then((data)=>{
            buisnessuserprofile = data.data(); 
            this.name = buisnessuserprofile.Name;
            this.email = buisnessuserprofile.email;
            this.password = buisnessuserprofile.password;
            this.cafeId = buisnessuserprofile.cafeId;
        }).catch((err)=>{
            console.log("비즈니스유저 프로필 불러오기를 실패 했습니다.", err);
        });
        return buisnessuserprofile;
    }

    async setBuisnessUserProfile(data){
        await this.loadUserId();
        BuisnessUserDatabase.doc(this.userId).update(data);
    }

    async getCafeIdToBuisnessUser(){
        await this.loadUserId();
        let BuisnessUserCafeData;
        await BuisnessUserDatabase.doc(this.userId).get().then((data)=>{
            console.log(data.data())
            BuisnessUserCafeData = data.data().cafeId;
        });
        return BuisnessUserCafeData;
    }

    async sendCafeIdToBuisnessUser(_cafeId){
        await this.loadUserId();
        BuisnessUserDatabase.doc(this.userId).update({
            cafeId : _cafeId
        });
    }

    async deleteCafeIdToBuisnessUser(){ 
        await this.loadUserId();
        await BuisnessUserDatabase.doc(this.userId).update({
            cafeId : null
        })
    }

    getName(){
        return this.name;    
    }

    getEmail(){
        return this.email;
    }

    getCafeId(){
        return this.cafeId;
    }
}