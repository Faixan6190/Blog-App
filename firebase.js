// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQiEiqnNMxpq8f_TgpJij9x2DYawqzPXY",
  authDomain: "blog-application-cd202.firebaseapp.com",
  projectId: "blog-application-cd202",
  storageBucket: "blog-application-cd202.appspot.com",
  messagingSenderId: "654592263190",
  appId: "1:654592263190:web:1547494dafa9d2626be137",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// console.log(app, "app");
// console.log(auth, "auth");
// console.log(db, "db");

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  app,
  auth,
  getFirestore,
  collection,
  getDocs,
  db,
  addDoc,
  where,
  query,
};
