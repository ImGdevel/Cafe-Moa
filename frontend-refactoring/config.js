// config.js
import Constants from 'expo-constants';

const config = {
    API_URL: Constants.expoConfig.extra.REACT_APP_API_URL,
    FIREBASE_API_KEY: Constants.expoConfig.extra.REACT_APP_FIREBASE_API_KEY,
};

export default config;