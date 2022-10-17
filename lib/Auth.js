import React from "react";
import {authService} from "../FireServer";

/*로그인 모듈*/
export const SignInUserAccount = async (email, password) => {
    const acessId = true;
    const data = await authService
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            acessId = false
        });
    //console.log(data);
    return new Promise((resolve, reject) => {
        if (acessId) 
            resolve();
        else 
            reject(error);
        }
    );
}

/*회원가입 모듈*/
export const CreateUserAccount = async (email, password) => {
    const data = await authService
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    console.log(data);
    return new Promise((resolve, reject) => {
        resolve();
    });
}

export async function getUserId(){
    var userId = 'null';
    authService.onAuthStateChanged((user)=>{
        if(user!=null){
            userId = user.uid;
        }
    });
    return userId;
}

export async function signOut(){
    authService.signOut();
}