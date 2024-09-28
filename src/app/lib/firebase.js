// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCww7QljasDb6vKJsR4dHWHGebxlGw_7rI",
  authDomain: "pomodoring.firebaseapp.com",
  projectId: "pomodoring",
  storageBucket: "pomodoring.appspot.com",
  messagingSenderId: "1052060824603",
  appId: "1:1052060824603:web:a5145760ea5fa7530c74be",
  measurementId: "G-F2LBFT78WD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
