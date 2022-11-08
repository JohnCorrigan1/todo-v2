import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Todo from "../components/Todo";
import FormModal from "../components/FormModal";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const addHandler = () => {
    setIsOpen(true);
  };

  const addFakeHandler = async () => {
    if (!user) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        uid: user.uid,
        title: "Learn react",
        description: "code something cool",
        date: "1/2/2223",
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <Head>
        <title>Todo</title>
        <meta name="Todo app" content="List of your todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center mt-10 text-2xl">
        {user ? <h1>{user.displayName}s Todos</h1> : <h1>Sign in</h1>}
      </div>
      <div>
        <button className="bg-emerald-300 p-3" onClick={addFakeHandler}>
          Add Todo
        </button>
      </div>
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="items-center justify-center flex mt-10">
        <Todo
          title="Learn Firebase"
          description="Learn authentication and crud operations with firebase and nextJS"
          done={false}
          due="1/1/2023"
        />
      </div>
    </div>
  );
};

export default Home;
