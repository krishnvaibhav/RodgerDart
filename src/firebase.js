// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
const storage = getStorage(app);
const rootRef = ref(storage);

export { auth, analytics, db, storage, rootRef };
