import { useState, useContext } from "react";
import Image from "next/image";
import { TodosContext } from "../lib/TodoContext";
import { db } from "../lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Todo: React.FC<{
  title: string;
  description: string;
  due: string;
  done: boolean;
  uid: string;
  todoId: string;
}> = (props) => {
  const [isDone, setIsDone] = useState(props.done);
  const [isExpand, setIsExpand] = useState(false);
  const todosContext = useContext(TodosContext);

  const doneHandler = () => {
    setIsDone(!isDone);
  };

  const expandHandler = () => {
    setIsExpand(!isExpand);
  };

  const removeHandler = async() => {
    removeFromFirebase();
    await deleteDoc(doc(db, "todos", props.todoId));
    todosContext.removeTodo(props.todoId);
  }

  //remove from todo from firebase on click
  const removeFromFirebase = async () => {
    try {
     await deleteDoc(doc(db, "todos", props.todoId));
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };



  return (
    <div className="flex flex-col w-full items-center sm:w-2/3">
      <div
        className={
          (isExpand ? "rounded-t-md " : "rounded-md ") +
          "bg-slate-400 flex justify-between p-3 items-center w-5/6  shadow-lg sm:w-2/3"
        }
      >
        <h1
          className={(isDone ? " line-through " : " ") + "text-xl sm:text-2xl"}
        >
          {props.title}
        </h1>
        <div className="flex gap-5">
          <div
            className={
              (isDone ? "bg-emerald-500 " : "bg-slate-400 ") +
              "border-2 border-white rounded-full w-8 h-8 cursor-pointer active:scale-90"
            }
            onClick={doneHandler}
          ></div>
          <div
            className="bg-slate-300 rounded-full flex items-center justify-center border-white border-2 active:scale-90"
            onClick={expandHandler}
          >
            {!isExpand ? (
              <Image src="/expand.svg" width={30} height={30} alt="expand" />
            ) : (
              <Image src="/close.svg" width={30} height={30} alt="close" />
            )}
          </div>
          {isDone && (
            <Image
              onClick={removeHandler}
              src="/trash.svg"
              width={30}
              height={30}
              className="active:scale-90"
              alt="delete"
            />
          )}
        </div>
      </div>
      {isExpand && (
        <div className=" shadow-md rounded-b-md flex-start w-5/6 sm:w-2/3 p-3 bg-slate-300 border-t-black border-t ">
          {props.description}
        </div>
      )}
    </div>
  );
};

export default Todo;
