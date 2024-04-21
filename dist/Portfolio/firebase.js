// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlXGMqSjjNXLITrKFbISIwuXKv2RAagS8",
  authDomain: "meenagopalakrishnan-88654.firebaseapp.com",
  projectId: "meenagopalakrishnan-88654",
  storageBucket: "meenagopalakrishnan-88654.appspot.com",
  messagingSenderId: "476945100767",
  appId: "1:476945100767:web:8b4f909f1a3ef8ee605e6a",
  measurementId: "G-6G6N7MNYJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);