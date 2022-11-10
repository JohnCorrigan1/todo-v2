import React, { Dispatch, useRef, useContext } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { TodosContext } from "../lib/TodoContext";

const FormModal: React.FC<{ isOpen: boolean; setIsOpen: Dispatch<boolean> }> = (
  props
) => {
  const todosContext = useContext(TodosContext);

  const [user] = useAuthState(auth);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredTitle = title.current!.value;
    const enteredDescription = description.current!.value;
    const enteredDate = date.current!.value;

    todosContext.addTodo(
      enteredTitle,
      enteredDescription,
      enteredDate,
      user!.uid
    );
    addFakeHandler(enteredTitle, enteredDescription, enteredDate);
    props.setIsOpen(false);
  };

  const cancelHandler = () => {
    props.setIsOpen(false);
  };

  const addFakeHandler = async (
    enteredTitle: string,
    enteredDescription: string,
    enteredDate: string
  ) => {
    if (!user) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        uid: user.uid,
        title: enteredTitle,
        description: enteredDescription,
        date: enteredDate,
        todoId: Math.random().toString(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (!props.isOpen) return null;

  return (
    <>
      <div className="modal bg-black bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 z-50"></div>
      <div className="bg-white flex flex-col gap-10 items-center justify-center p-12 rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-lg z-50 h-5/8 sm:h-1/2">
        <h1 className="text-2xl font-bold">Add Todo</h1>
        <div className="flex flex-col justify-center items-center gap-10">
          <form onSubmit={submitHandler}>
            <div className="flex flex-col">
              <label htmlFor="title">Todo Title</label>
              <input
                type="text"
                id="title"
                ref={title}
                required
                className="bg-zinc-200 broder pr-1 pl-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="title">Todo Description</label>
              <input
                type="textarea"
                id="title"
                ref={description}
                className="bg-zinc-200 pr-1 pl-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date">Todo Due Date</label>
              <input type="date" id="date" ref={date} className="bg-zinc-200" />
            </div>
            <div className="flex gap-10 mt-10">
              <button
                className="rounded-lg w-fit p-3 bg-cyan-500 hover:bg-cyan-600 shadow-md shadow-slate-500 text-xl"
                type="submit"
              >
                Submit
              </button>
              <button
                className=" hover:bg-rose-600 text-xl rounded-lg bg-rose-500 w-fit p-3 shadow-md shadow-slate-500"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormModal;
