import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendSignInLinkToEmail,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const SignUp: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const emailChangeHanlder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHanlder = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChangeHanlder = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    // const emailRef = useRef<HTMLInputElement>()
    // const emailRef = useRef<HTMLInputElement>(null);
    // const passwordRef = useRef<HTMLInputElement>()
    // const confirmPasswordRef = useRef<HTMLInputElement>()
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Error: " + errorMessage, errorCode);
        // ..
      });
  };

  return (
    <div className="flex justify-center mt-10 w-full">
      <Head>
        <title>Todo</title>
        <meta name="Todo app" content="List of your todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 flex item-center flex-col border-2 border-black rounded-lg bg-zinc-50 shadow-xl">
        <form onSubmit={submitHandler} className="">
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={emailChangeHanlder}
              className="border-2 rounded-md pl-1 pr-1 border-slate-400"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={passwordChangeHanlder}
              className="border-2 rounded-md pl-1 pr-1 border-slate-400"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              onChange={confirmPasswordChangeHanlder}
              className="border-2 rounded-md pl-1 pr-1 border-slate-400"
            />
          </div>
          <div className=" mt-5 flex justify-center gap-5">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 active:scale-95 rounded-md pl-3 pr-3 p-2 shadow-md cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
