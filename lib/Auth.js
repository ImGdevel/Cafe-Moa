import React from "react";
import { authService } from "../FireServer";

export const SetAccount = async (email, password) => {
    await authService.createUserWithEmailAndPassword(email, password);
}

export const SignInAccount = async (email, password) => {
    await authService.signInWithEmailAndPassword(email, password);
}

const GetAccount = async () => {
    
}