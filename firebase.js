// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'inventory-management-167be.firebaseapp.com',
  projectId: 'inventory-management-167be',
  storageBucket: 'inventory-management-167be.appspot.com',
  messagingSenderId: '636095144529',
  appId: '1:636095144529:web:0a8ca8b62097fe0cb64e70'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
