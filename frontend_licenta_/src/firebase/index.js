import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBZc_QxUO9suHmw48z7cT96QCgKZjbrx14",
    authDomain: "licenta-3f486.firebaseapp.com",
    projectId: "licenta-3f486",
    storageBucket: "licenta-3f486.appspot.com",
    messagingSenderId: "8346004844",
    appId: "1:8346004844:web:2278fbfaf69c120ec4d749",
    measurementId: "G-PJBN7XYPDL"
  };
  
// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = firebase.storage();

export { storage, firebase, app, analytics };