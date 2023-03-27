// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "questions-and-answers-85689.firebaseapp.com",
  projectId: "questions-and-answers-85689",
  storageBucket: "questions-and-answers-85689.appspot.com",
  messagingSenderId: "724210260387",
  appId: "1:724210260387:web:d06da06333d9619669e216",
  measurementId: "G-YNF0RQXPRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider};