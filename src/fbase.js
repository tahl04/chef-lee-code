import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //로그인
import { getFirestore } from "firebase/firestore"; //DB연결

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.EACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
}; 

const app = initializeApp(firebaseConfig);
export default app;
export const authService = getAuth();
export const dbService = getFirestore();