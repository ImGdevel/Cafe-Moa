/*
import firebase from "firebase";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "./ApiKey"
import { FireBaseApiKey, MapApiKey } from "./ApiKey";

// Initialize Firebase
firebase.initializeApp(FireBaseApiKey);

export const MyDatabase = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
export const storageService = firebase.storage();
export const GoogleMapApiKey = MapApiKey;
//export const asyncStorage = AsyncStorage;

*/
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase 설정 정보
 const firebaseConfig = {
    apiKey: "AIzaSyBgd2MfLmySEEUQksyiydHh7c6j9SXYEjk",
    authDomain: "cafemoa-ed4c7.firebaseapp.com",
    projectId: "cafemoa-ed4c7",
    storageBucket: "cafemoa-ed4c7.appspot.com",
    messagingSenderId: "602002923909",
    appId: "1:602002923909:web:4546cab0f963b48e6724ec",
    measurementId: "G-86W50KJ994"
  };
  

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 가져오기
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

export const MyDatabase = app;
export const dbService = db;
export const authService = auth;
export const storageService = storage;
export const GoogleMapApiKey = "";