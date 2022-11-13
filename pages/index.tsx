import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Todo from "../components/Todo";
import FormModal from "../components/FormModal";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { TodoItem } from "../models/todo";
import { TodosContext } from "../lib/TodoContext";

const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [Todos, setTodos] = useState<TodoItem[]>([]);

  const todosContext = useContext(TodosContext);
  const addHandler = async () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (user) {
      if (todosContext.items.length < 1) {
        getTodos();
      }
    }
    setTodos(todosContext.items);
  }, [todosContext, user]);

  const getTodos = async () => {
    const q = query(collection(db, "todos"), where("uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const item = doc.data();

      todosContext.addFromFirebase(
        item.title,
        item.description,
        item.date,
        item.uid,
        doc.id
      );
    });
    setTodos(todosContext.items);
  };

  return (
    <div className="flex justify-center flex-col w-full items-center">
      <Head>
        <title>Todo</title>
        <meta name="Todo app" content="List of your todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center mt-10 text-2xl dark:text-zinc-50">
        {/* {user ? <h1>{user?.displayName}s Todos</h1> : <h1>Sign in</h1>} */}
       {user ? user.isAnonymous ? <h1 >Anons Todos</h1> : <h1>{user?.displayName ? user.displayName : "My Todos"}s Todos</h1> : <h1></h1>}
      </div>
      {user && (
      <div className="flex justify-center mt-5">
        <button
          className="bg-emerald-300 p-3 rounded-md active:scale-95 hover:bg-emerald-400 font-bold shadow-md dark:bg-emerald-500 dark:text-zinc-50 dark:hover:bg-emerald-600"
          onClick={addHandler}
        >
          Add Todo
        </button>
      </div>)}
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {user ? (
        <div className="items-center justify-center flex flex-col gap-5 mt-10 w-full">
          <Todo
            title="Learn Firebase"
            description="Learn authentication and crud operations with firebase and nextJS"
            done={false}
            due="1/1/2023"
            uid={user!.uid}
            key={Math.random().toString()}
            todoId={"1"}
          />
          {Todos?.map((todo: TodoItem) => {
            return (
              <Todo
                title={todo.title}
                description={todo.description}
                done={false}
                due={todo.date}
                uid={user.uid}
                key={todo.todoId}
                todoId={todo.todoId}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-2xl font-semibold  mt-10 dark:text-zinc-50">Log in to view and add todos</div>
      )}
    </div>
  );
};

export default Home;
