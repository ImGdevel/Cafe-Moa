import React from "react";
import { authService } from "../FireServer";

export const SignInUserAccount = async (email, password) => {
    var acessId = true;
    const data = await authService.signInWithEmailAndPassword(email, password)
            .catch(function(error) {
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
      });;
      console.log(data);
      console.log(acessId);
    return new Promise((resolve, reject) => {
        resolve({acessId})
    });
    

}


export const CreateUserAccount = async(email, password) => {
    const data =  await authService.createUserWithEmailAndPassword(email, password);
    console.log(data)

    return new Promise((resolve, reject) => {
            

    });
  }
