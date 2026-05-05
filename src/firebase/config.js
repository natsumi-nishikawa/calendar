// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5TwIq5keO1FhHA5tDLbrAIct7WjHU-wE",
  authDomain: "calendar-ab319.firebaseapp.com",
  projectId: "calendar-ab319",
  storageBucket: "calendar-ab319.firebasestorage.app",
  messagingSenderId: "719064959542",
  appId: "1:719064959542:web:555418971173ff90372697",
  measurementId: "G-P5VC5X68SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };