import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import { signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { useEffect, useState, useCallback, useContext } from 'react';
import { UserContext } from "../lib/AuthContext";
import { auth, db, googleProvider } from '../lib/firebase';
import { addDoc, collection } from "firebase/firestore"; 

const SignIn: NextPage = () => {

    const { user } = useContext(UserContext)

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider)
    }

    const addUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
              name: user?.displayName,
              todos: []
            });
          
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return(
        <div className='flex justify-center mt-10'>
             <button
      className="bg-zinc-200 rounded-md p-3 flex gap-10 items-center shadow-sm border"
      onClick={signInWithGoogle}
    >
      <Image src="/google.png" alt="Google sign in" width={30} height={30} /> Sign in
      with Google
    </button>
    <button onClick={addUser}>add me</button>
        </div>
    )
}

export default SignIn;