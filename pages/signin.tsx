import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signInWithPopup, signInAnonymously, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useContext, useState } from "react";
import { UserContext } from "../lib/AuthContext";
import { auth, googleProvider } from "../lib/firebase";
import toast from 'react-hot-toast';

const SignIn: NextPage = () => {
  const { user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    toast.success("Signed in with Google");
  };

  const submitHandler  = async (event: React.FormEvent) => {
    event.preventDefault();
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        toast.success("Signed in with email and password");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Error: " + errorMessage, errorCode);
      });
  };

  const signInAnonymouslyHandler = async () => {
    await signInAnonymously(auth);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex justify-center mt-10 w-full">
      <Head>
        <title>Todo</title>
        <meta name="Todo app" content="List of your todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 flex item-center flex-col border-2 border-black rounded-lg bg-zinc-50 shadow-xl">
        <form onSubmit={submitHandler} className="border-b border-black pb-5">
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={emailChangeHandler} className="border-2 rounded-md pl-1 pr-1 border-slate-400" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={passwordChangeHandler} className="border-2 rounded-md pl-1 pr-1 border-slate-400" />
            </div>
            <div className=" mt-5 flex justify-center gap-5">
              <button type="submit" className="bg-blue-400 hover:bg-blue-500 active:scale-95 rounded-md pl-3 pr-3 p-2 shadow-md cursor-pointer">Sign in</button>
              <Link href="/signup"><button className=" rounded-md bg-zinc-200 p-2 pl-3 pr-3 shadow-md cursor-pointer active:scale-95 hover:bg-zinc-300">Sign up</button></Link>
            </div>
        </form>

      <div className="mt-5">
      <button
        className="bg-zinc-200 rounded-md p-2 flex gap-8 items-center shadow-sm border w-full"
        onClick={signInWithGoogle}
      >
        <Image src="/google.png" alt="Google sign in" width={30} height={30} />{" "}
        Sign in with Google
      </button>
      </div>
      <div className="mt-5">
      <button
        className="bg-zinc-200 rounded-md p-2 flex gap-8 items-center shadow-sm border"
        onClick={signInAnonymouslyHandler}
      >
        <Image src="/anon.svg" alt="anon sign in" width={30} height={30} />{" "}
        Sign in anonymously
      </button>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
