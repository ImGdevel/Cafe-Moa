import { dbService, MyDatabase } from "../FireServer";
import { getCurrentUserId } from "./AuthService";
import { List } from "./DataStructure/List";
const UserDatabase = dbService.collection("User");
const BuisnessUserDatabase = dbService.collection("BuisnessUser");

// 개인용
export class UserDataService{
    constructor(userId){        
        this.userId = userId;
        this.name;
        this.email;
        this.password;
        this.reservation;
        this.bookmarks;
    }

    /** 현제 로그인된 유저 데이터를 가져옵니다. */
    async loadUserId(){
        if(this.userId == null){
            console.log("현재 유저ID가 없습니다... 불러옵니다....");
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
            this.bookmarks = userprofile.bookmarks;
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

    /** 북마크 내역을 가져옵니다. */
    async getBookmarksToUser(){
        await this.loadUserId();
        let UserBookmarks;
        await UserDatabase.doc(this.userId).get().then((data)=>{
            console.log(data.data())
            UserBookmarks = data.data().bookmarks;
        });
        return UserBookmarks;
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
        return this.bookmarks;
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




// /** 유저 프로필 등록 (이름 , 아이디, 이메일, 비밀번호) */
// export async function createUserProfile(name, id, email, password){
//     let userId = id;
//     if(userId == null){ //유저 아이디를 안 넣었다면 갱신
//         userId = await getCurrentUserId();
//     }
//     await UserDatabase.doc(userId).set({
//         uid: userId,
//         Name: name,
//         email: email,
//         password: password,
//         reservation : {
//             cafeId : null,
//             seatId: null,
//             time : null,
//             seatNumber : null,
//         }
//     })

// }

// /** 유저 정보 수정 */
// export async function updateUserProfile(data){
//     userId = await getCurrentUserId();
//     UserDatabase.doc(userId).update(data);
// }

// /** 예약 정보를 유저정보로 보냅니다: (cafeId: 카페id, seat_number: 좌석번호 ) */
// export async function sendReservetionToUser(_cafeId, _seatId ,_time, _seatNumber){
//     userId = await getCurrentUserId(); 
//     UserDatabase.doc(userId).update({
//         reservation : {
//             cafeId : _cafeId,
//             time : _time,
//             seatNumber : _seatNumber,
//             seatId : _seatId,
//         }
//     });
// }

// /** 유저 데이터를 가져옵니다. */
// export async function getUserProfile(_userId){
//     let userId = _userId
//     if(userId == null){
//         userId = await getCurrentUserId();
//     }
//     let UserData;
//     await UserDatabase.doc(userId).get().then((data)=>{
//         UserData = data.data(); 
//     }).catch((err)=>{
//         console.log("유저데이터 불러오기 실패",err);
//     });
//     return UserData;
// }

// /** 서버에서 예약 내역 가져옴 */
// export async function getReservetionToUser(){
//     userId = await getCurrentUserId(); 
//     let UserReData;
//     await UserDatabase.doc(userId).get().then((data)=>{
//         console.log(data.data())
//         UserReData = data.data().reservation; 
//     });
//     return UserReData;
// }

// /** 서버에서 예약 내역 삭제 */
// export async function deleteReservationToUser(){ 
//     userId = await getCurrentUserId();
//     await UserDatabase.doc(userId).update({
//         reservation : {
//             cafeId : null,
//             seatId : null,
//             time : null,
//             seatNumber : null,
//         },
//     })
// }











// /** 유저 프로필 등록 (이름 , 아이디, 이메일, 비밀번호) */
// export async function createUserProfile(name, id, email, password){
//     let userId = id;
//     if(userId == null){ //유저 아이디를 안 넣었다면 갱신
//         userId = await getCurrentUserId();
//     }
//     await UserDatabase.doc(userId).set({
//         uid: userId,
//         Name: name,
//         email: email,
//         password: password,
//         reservation : {
//             cafeId : null,
//             seatId: null,
//             time : null,
//             seatNumber : null,
//         }
//     })

// }

// /** 유저 정보 수정 */
// export async function updateUserProfile(data){
//     userId = await getCurrentUserId();
//     UserDatabase.doc(userId).update(data);
// }

// /** 예약 정보를 유저정보로 보냅니다: (cafeId: 카페id, seat_number: 좌석번호 ) */
// export async function sendReservetionToUser(_cafeId, _seatId ,_time, _seatNumber){
//     userId = await getCurrentUserId(); 
//     UserDatabase.doc(userId).update({
//         reservation : {
//             cafeId : _cafeId,
//             time : _time,
//             seatNumber : _seatNumber,
//             seatId : _seatId,
//         }
//     });
// }

// /** 유저 데이터를 가져옵니다. */
// export async function getUserProfile(_userId){
//     let userId = _userId
//     if(userId == null){
//         userId = await getCurrentUserId();
//     }
//     let UserData;
//     await UserDatabase.doc(userId).get().then((data)=>{
//         UserData = data.data(); 
//     }).catch((err)=>{
//         console.log("유저데이터 불러오기 실패",err);
//     });
//     return UserData;
// }

// /** 서버에서 예약 내역 가져옴 */
// export async function getReservetionToUser(){
//     userId = await getCurrentUserId(); 
//     let UserReData;
//     await UserDatabase.doc(userId).get().then((data)=>{
//         console.log(data.data())
//         UserReData = data.data().reservation; 
//     });
//     return UserReData;
// }

// /** 서버에서 예약 내역 삭제 */
// export async function deleteReservationToUser(){ 
//     userId = await getCurrentUserId();
//     await UserDatabase.doc(userId).update({
//         reservation : {
//             cafeId : null,
//             seatId : null,
//             time : null,
//             seatNumber : null,
//         },
//     })
// }
