// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxZ-BoCIDzRTM1_LMllNsB8BW8Fk44VPs",
  authDomain: "prepmax-98464.firebaseapp.com",
  projectId: "prepmax-98464",
  storageBucket: "prepmax-98464.firebasestorage.app",
  messagingSenderId: "225578826693",
  appId: "1:225578826693:web:0b96893ce799ee0929a9ac",
  measurementId: "G-7SPEWFKX0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
