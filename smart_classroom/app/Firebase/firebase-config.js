// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fir-image-5355f.firebaseapp.com",
  projectId: "fir-image-5355f",
  storageBucket: "fir-image-5355f.appspot.com",
  messagingSenderId: "547462141293",
  appId: "1:547462141293:web:d4f491ca134b91c1457664"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app)