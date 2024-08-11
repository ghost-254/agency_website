import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeNtFT9Kl_2VE_HYH2a_TX6qmrRFYobB8",
  authDomain: "outreachconnectsacrament-9e3ed.firebaseapp.com",
  projectId: "outreachconnectsacrament-9e3ed",
  storageBucket: "outreachconnectsacrament-9e3ed.appspot.com",
  messagingSenderId: "716842362601",
  appId: "1:716842362601:web:082bd9eede0fa807223278",
  measurementId: "G-9KQCV4WJRL"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services
export { app, auth, db };
