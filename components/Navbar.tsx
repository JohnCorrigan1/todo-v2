import Link from "next/link";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../lib/AuthContext";

const Navbar: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="flex w-full bg-slate-200 shadow-sm shadow-zinc-400 font-bold">
      <ul className=" p-5 pl-5 pr-5 flex w-full items-center sm:pl-10 sm:pr-10 justify-between">
        <li>
          <Link href="/">
            <button className="shadow-sm bg-slate-600 text-white p-3 pr-6 pl-6 sm:p-2 sm:pr-4 sm:pl-4 rounded-md active:scale-95 hover:bg-slate-700">
              Todos
            </button>
          </Link>
        </li>

        {!user ? (
          <li>
            <Link href="/signin">
              <button className="bg-sky-500 shadow-sm text-white p-2 pr-3 pl-3 rounded-md active:scale-95 hover:bg-sky-600">
                Log In
              </button>
            </Link>
          </li>
        ) : (
          <div className="flex gap-5 sm:gap-10 ">
            <li>
              <img
                className="rounded-full border-white w-10"
                src={user.photoURL || "/google.png"}
                alt="Profile pic"
              />
            </li>
            <li>
              <Link href="/signin">
                <button
                  className="bg-sky-500 shadow-sm text-white p-2 pr-3 pl-3 rounded-md active:scale-95 hover:bg-sky-600"
                  onClick={() => auth.signOut()}
                >
                  Log Out
                </button>
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
