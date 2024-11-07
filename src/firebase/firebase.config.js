// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL2DucQlfEQWi0P44S55jFp3iLsQ12kpQ",
  authDomain: "retaurent-e-commerce.firebaseapp.com",
  projectId: "retaurent-e-commerce",
  storageBucket: "retaurent-e-commerce.appspot.com",
  messagingSenderId: "648554176260",
  appId: "1:648554176260:web:517fe3b80dc4a27145fa51",
  measurementId: "G-9ECKFEH89Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);