import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Todo from "../components/Todo";
import FormModal from "../components/FormModal";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";

type Todo = {
  title: string;
  description: string;
  date: string;
  uid: string;
} | null;

const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const [Todos, setTodos] = useState<Todo[]>([]);

  const addHandler = async () => {
    setIsOpen(true);
    // const q = query(collection(db, "todos"), where("uid", "==", user?.uid));
    // console.log(q);
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc: any) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   setTodos((prevTodos) => {
    //     return [doc.data(), ...prevTodos];
    //   });
    // });
    console.log(Todos);
  };

  // const Todos = () => {
  //     .collection("todos")

  // .where("uid", "==", user?.uid)
  // }

  useEffect(() => {
    if (user) {
      if (Todos.length < 1) {
        getTodos();
      }
    }
  });

  const getTodos = async () => {
    const q = query(collection(db, "todos"), where("uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setTodos((prevTodos) => {
        return [doc.data(), ...prevTodos];
      });
    });
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
        <button className="bg-emerald-300 p-3" onClick={addHandler}>
          Add Todo
        </button>
      </div>
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen} setTodos={setTodos} />
      <div className="items-center justify-center flex flex-col gap-5 mt-10">
        <Todo
          title="Learn Firebase"
          description="Learn authentication and crud operations with firebase and nextJS"
          done={false}
          due="1/1/2023"
        />
        {Todos?.map((todo) => {
          return (
            <Todo
              title={todo!.title}
              description={todo!.description}
              done={false}
              due={todo!.date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
