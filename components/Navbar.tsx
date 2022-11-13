import Link from "next/link";
import { auth, db } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/AuthContext";
import { TodosContext } from "../lib/TodoContext";
import { deleteDoc, doc } from "firebase/firestore";
import DarkMode from "./DarkMode";

const Navbar: React.FC = () => {
  const { user } = useContext(UserContext);
  const todosContext = useContext(TodosContext);

  const signOutHandler = async () => {
    if (user?.isAnonymous) {
      todosContext.items.forEach((todo) => {
        if (todo.uid === user.uid) {
          removeAnons(todo.todoId);
        }
      });
      todosContext.removeAnons(user.uid);
    }
    await auth.signOut();
  };

  const removeAnons = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // const toggleThemeHandler = () => {
  //   useDarkMode();
  // };

  return (
    <nav className="flex w-full bg-slate-200 dark:bg-slate-600 shadow-sm shadow-zinc-400 font-bold">
      <ul className=" p-5 pl-5 pr-5 flex w-full items-center sm:pl-10 sm:pr-10 justify-between">
        <li>
          <Link href="/">
            <button className="shadow-sm bg-slate-600 dark:bg-slate-400 hover:dark:bg-slate-500 text-white p-3 pr-6 pl-6 sm:p-2 sm:pr-4 sm:pl-4 rounded-md active:scale-95 hover:bg-slate-700">
              Todos
            </button>
          </Link>
        </li>
      <div className="flex gap-5 items-center">
        <li className="ml-auto">
            <DarkMode />
          </li>
        {!user ? (
           
          <li>
            <Link href="/signin">
              <button className="bg-sky-500 shadow-sm text-white dark:text-zinc-50 p-2 pr-3 pl-3 rounded-md active:scale-95 hover:bg-sky-600 dark:bg-blue-600 hover:dark:bg-blue-700">
                Log In
              </button>
            </Link>
          </li>
        ) : (
          <div className="flex gap-5 sm:gap-10 ">
            <li>
              <img
                className="rounded-full border-white w-10"
                src={user.photoURL || "/anon.svg"}
                alt="Profile pic"
              />
            </li>
            <li>
              <Link href="/signin">
                <button
                  className="bg-sky-500 shadow-sm text-white p-2 pr-3 pl-3 rounded-md active:scale-95 hover:bg-sky-600"
                  // onClick={() => auth.signOut()}
                  onClick={signOutHandler}
                >
                  Log Out
                </button>
              </Link>
            </li>
          </div>
        )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
