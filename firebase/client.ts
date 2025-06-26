// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_CLEINT_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLEINT_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLEINT_MESSAGE_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_CLEINT_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_CLEINT_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
