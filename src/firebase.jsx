// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4ZOie7pyeSm7rKU7jZ9PWSDfk2HLb3Ig",
  authDomain: "project1js-16740.firebaseapp.com",
  projectId: "project1js-16740",
  storageBucket: "project1js-16740.appspot.com",
  messagingSenderId: "783073692315",
  appId: "1:783073692315:web:4b1a129724f1a317e6543e",
  measurementId: "G-917BHDGF1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);