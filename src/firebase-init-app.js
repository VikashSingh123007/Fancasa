// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPKvXBTxqXTtSPOIFDqHcCLszhHZxol-M",
  authDomain: "fancasa-44b69.firebaseapp.com",
  projectId: "fancasa-44b69",
  storageBucket: "fancasa-44b69.firebasestorage.app",
  messagingSenderId: "22236236290",
  appId: "1:22236236290:web:ac2c4e66b78f8af739b51b",
  measurementId: "G-RY579J0F5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);