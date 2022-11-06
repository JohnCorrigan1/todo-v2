import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMrJTAcMPk8dOtEUlUJJeNm6snweoc3HE",
  authDomain: "todo-list-25d92.firebaseapp.com",
  projectId: "todo-list-25d92",
  storageBucket: "todo-list-25d92.appspot.com",
  messagingSenderId: "736009191981",
  appId: "1:736009191981:web:a39e45941289598705eea4",
  measurementId: "G-G9R8NXCJ5B"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();