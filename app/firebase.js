// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPAxC2BXjeXdy5Agt6a6Y-kzzavuV8Ywc",
  authDomain: "outreachconnect-b4e18.firebaseapp.com",
  projectId: "outreachconnect-b4e18",
  storageBucket: "outreachconnect-b4e18.appspot.com",
  messagingSenderId: "966975707949",
  appId: "1:966975707949:web:b955e080bd4a0037dd51a4",
  measurementId: "G-FLZRJ90LXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };