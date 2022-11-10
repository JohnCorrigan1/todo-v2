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
import TodosContextProvider from "../lib/TodoContext";
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
        console.log("test");
      }
    }
    setTodos(todosContext.items);
  }, [todosContext]);

  const getTodos = async () => {
    const q = query(collection(db, "todos"), where("uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      todosContext.addTodo(item.title, item.description, item.date, item.uid);
    });
    setTodos(todosContext.items);
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
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {user ? (
        <div className="items-center justify-center flex flex-col gap-5 mt-10">
          <Todo
            title="Learn Firebase"
            description="Learn authentication and crud operations with firebase and nextJS"
            done={false}
            due="1/1/2023"
            uid={user!.uid}
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
              />
            );
          })}
        </div>
      ) : (
        <div>Sign in to view and add todos</div>
      )}
    </div>
  );
};

export default Home;
