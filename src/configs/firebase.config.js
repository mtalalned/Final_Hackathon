// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCyHhg3Erx2vPnJETQgkwIWdtpxTHhENU",
  authDomain: "final-hackathon-35189.firebaseapp.com",
  projectId: "final-hackathon-35189",
  storageBucket: "final-hackathon-35189.firebasestorage.app",
  messagingSenderId: "170066766109",
  appId: "1:170066766109:web:03edcedcd45550c165d9f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);