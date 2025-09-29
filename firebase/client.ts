// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCxZ-BoCIDzRTM1_LMllNsB8BW8Fk44VPs',
	authDomain: 'prepmax-98464.firebaseapp.com',
	projectId: 'prepmax-98464',
	storageBucket: 'prepmax-98464.firebasestorage.app',
	messagingSenderId: '225578826693',
	appId: '1:225578826693:web:0b96893ce799ee0929a9ac',
	measurementId: 'G-7SPEWFKX0K',
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
