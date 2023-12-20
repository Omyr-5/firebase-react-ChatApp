// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBn7eeQRzs0zxIyM1ZzPhoUgVMVdbl01mo",
    authDomain: "react-chatapp-bf0b1.firebaseapp.com",
    projectId: "react-chatapp-bf0b1",
    storageBucket: "react-chatapp-bf0b1.appspot.com",
    messagingSenderId: "54704165313",
    appId: "1:54704165313:web:3ebe1e2bba228adda1df40"
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    // appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const firestore = getFirestore(app);
export { firestore };

export default app;