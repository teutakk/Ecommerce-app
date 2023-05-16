// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPp6CNNQzqaYFDBmv-Sc8A_HM-do5KYsc",
  authDomain: "ecommerce-e754e.firebaseapp.com",
  projectId: "ecommerce-e754e",
  storageBucket: "ecommerce-e754e.appspot.com",
  messagingSenderId: "491202288151",
  appId: "1:491202288151:web:c54937970b4eec5dbf1a52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app