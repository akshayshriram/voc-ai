// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4R452uuPs2NE-RgZpoOH_6kNx4Wbpf0s",
  authDomain: "voc-ai-a556f.firebaseapp.com",
  projectId: "voc-ai-a556f",
  storageBucket: "voc-ai-a556f.firebasestorage.app",
  messagingSenderId: "1085109962104",
  appId: "1:1085109962104:web:e9287030e39f17cedd348d",
  measurementId: "G-WR4R6982SZ",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
