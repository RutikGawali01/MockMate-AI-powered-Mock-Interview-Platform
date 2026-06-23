
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mock-interview-65635.firebaseapp.com",
  projectId: "mock-interview-65635",
  storageBucket: "mock-interview-65635.firebasestorage.app",
  messagingSenderId: "896911295743",
  appId: "1:896911295743:web:047f76d65ebab5ba6cf8ca"
};

 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider }
