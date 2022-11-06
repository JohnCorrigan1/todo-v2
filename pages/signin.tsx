import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import { signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { useEffect, useState, useCallback, useContext } from 'react';
import { UserContext } from "../lib/AuthContext";
import { auth, db, googleProvider } from '../lib/firebase';

const SignIn: NextPage = () => {

    const { user } = useContext(UserContext)

    const signInWithGoogle = async () => {
        console.log("before", user)
        await signInWithPopup(auth, googleProvider);
        console.log("after",user)
    }

    return(
        <div>
             <button
      className="bg-zinc-200 rounded-md p-3 flex gap-10 items-center shadow-sm border"
      onClick={signInWithGoogle}
    >
      <Image src="/google.png" alt="Google sign in" width={30} height={30} /> Sign in
      with Google
    </button>
        </div>
    )
}

export default SignIn;