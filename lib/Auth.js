import React from "react";
import { authService } from "../FireServer";

export const SignInUserAccount = async (email, password) => {
    await authService.signInWithEmailAndPassword(email, password);
}


export const CreateUserAccount = async(email, password) => {
    console.log("Hi")
    const data =  await authService.createUserWithEmailAndPassword(email, password);
    
    console.log(data)

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return new Promise((reject)=>reject("Error"));
    }
    let {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:10});

    return new Promise((resolve, reject) => {
        if (latitude!=null && longitude!=null) 
        resolve({
            latitude: latitude,
            longitude: longitude
        });    
        else reject("Error");
      });
  }
