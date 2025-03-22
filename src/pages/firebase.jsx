import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDazXhyIC5UFzAUBE2twzTnBO9k9u7NqHM",
  authDomain: "pressok-89ee6.firebaseapp.com",
  projectId: "pressok-89ee6",
  storageBucket: "pressok-89ee6.appspot.com",
  messagingSenderId: "58696650303",
  appId: "1:58696650303:web:c673119db6f28e1555328a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
