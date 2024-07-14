import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import config from '@config';

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_DOMAIN,
  projectId: config.FIREBASE_PROJECT,
  storageBucket: config.FIREBASE_STOTAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MSG_SENDER,
  appId: config.FIREBASE_API_ID,
  measurementId: config.FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, getApp, getAuth };

