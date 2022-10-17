import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  /*apiKey: "AIzaSyDa6DPB6A3oRKbI8zVkfPJAow81fDJjRkY",
  authDomain: "cafemoa-f9244.firebaseapp.com",
  projectId: "cafemoa-f9244",
  storageBucket: "cafemoa-f9244.appspot.com",
  messagingSenderId: "571985972680",
  appId: "1:571985972680:web:acfbb695ab86f008d004fd"*/
  apiKey: "AIzaSyAmbcMo8zf8CHuV0l6FoLwk0VmIYH1fkQA",
  authDomain: "test-9fd29.firebaseapp.com",
  projectId: "test-9fd29",
  storageBucket: "test-9fd29.appspot.com",
  messagingSenderId: "12706083630",
  appId: "1:12706083630:web:57d4e48975434da98780bf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const MyDatabase = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
export const storageService = firebase.storage();