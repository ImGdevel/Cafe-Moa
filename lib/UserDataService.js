import { dbService } from "../FireServer";
import { getUserId } from "./AuthService";

const UserDatabase = dbService.collection("User");

export async function createUserProfile(user, email, password){
    let userId = user
    if(userId == null){
        userId = await getUserId();
    }
    console.log(userId)
    await UserDatabase.doc(userId).set({
        uid: userId,
        Name: "홍길동",
        email: email,
        password: password,
    });
}

export async function updateUserProfile(id, user_profile){

}

export async function getUserProfile(id){

}