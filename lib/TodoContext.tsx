import { TodoItem } from "../models/todo";
import { useState, createContext, useContext } from "react";
import { UserContext } from "../lib/AuthContext";



type TodoContextObj = {
  items: TodoItem[];
  addTodo: (
    title: string,
    description: string,
    date: string,
    uid: string,
    id: string
  ) => void;
  addFromFirebase(
    title: string,
    description: string,
    date: string,
    uid: string,
    todoId: string
  ): void;
  removeTodo: (id: string) => void;
  updateId: (id: string, oldId: string) => void;
  removeAnons: (uid: string) => void;
};

type Props = {
  children?: React.ReactChild | React.ReactChild[];
};

export const TodosContext = createContext<TodoContextObj>({
  items: [],
  addTodo: () => {},
  addFromFirebase: () => {},
  removeTodo: (id: string) => {},
  updateId: (id: string) => {},
  removeAnons: (uid: string) => {},
});

const TodosContextProvider: React.FC<Props> = (props) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodoHandler = (
    title: string,
    description: string,
    date: string,
    uid: string,
    id: string
  ) => {
    setTodos((prevTodos) => {
      return [...prevTodos, new TodoItem(title, description, date, uid, id)];
    });
  };

  const addFromFirebaseHandler = (
    title: string,
    description: string,
    date: string,
    uid: string,
    todoId: string
  ) => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        new TodoItem(title, description, date, uid, todoId),
      ];
    });
  };

  const removeTodoHanler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.todoId !== id);
    });
  };

  const removeAnonsTodoHandler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.uid !== id);
    });
  };

  const updateIdHanlder = (id: string, oldId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.todoId === oldId) {
          todo.todoId = id;
        }
        return todo;
      });
    });
  };

  const contextValue: TodoContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    addFromFirebase: addFromFirebaseHandler,
    removeTodo: removeTodoHanler,
    updateId: updateIdHanlder,
    removeAnons: removeAnonsTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
