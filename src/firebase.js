import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAZ4fsv9Ys16n7366EWAcNtxEYx7wVVZCM",
  authDomain: "chat-57189.firebaseapp.com",
  projectId: "chat-57189",
  storageBucket: "chat-57189.appspot.com",
  messagingSenderId: "218742053883",
  appId: "1:218742053883:web:a18b3dc1fbec24fd7d495e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
