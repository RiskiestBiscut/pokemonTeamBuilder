// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9P3gmCxcrUxmlr_1ut71EjVIVklI0hRo",
  authDomain: "pb-maker.firebaseapp.com",
  projectId: "pb-maker",
  storageBucket: "pb-maker.appspot.com",
  messagingSenderId: "893616560799",
  appId: "1:893616560799:web:0356a16a3f32a3e3fb60aa",
  measurementId: "G-D0TPVDKVTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
