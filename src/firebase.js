// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLPd_SIVhH7XIEkPn_H6JKsKpBrCS_X7Y",
  authDomain: "rodgerdart-112da.firebaseapp.com",
  projectId: "rodgerdart-112da",
  storageBucket: "rodgerdart-112da.appspot.com",
  messagingSenderId: "131810214855",
  appId: "1:131810214855:web:49ca12c23bd4425e654fe2",
  measurementId: "G-4F1KZTZLBE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics, db };
