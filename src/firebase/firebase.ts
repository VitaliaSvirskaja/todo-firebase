// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0-0QiXZ9oFxgVczbTDSk89aAGr4Pq2h8",
    authDomain: "todo-firebase-c2fce.firebaseapp.com",
    projectId: "todo-firebase-c2fce",
    storageBucket: "todo-firebase-c2fce.appspot.com",
    messagingSenderId: "911682292734",
    appId: "1:911682292734:web:bb4713f3bd5d419b788eaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(app);
