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

