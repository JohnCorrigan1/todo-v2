import React from "react";

import { TodoItem } from "../models/todo";
import { useState } from "react";
import { defaultConfig } from "next/dist/server/config-shared";

type TodoContextObj = {
    items: TodoItem[],
    addTodo: (title: string, description: string, date: string, uid: string) => void,
    // removeTodo: (id: string) => void
}

type Props = {
    children?:
      | React.ReactChild
      | React.ReactChild[];
  }; 

export const TodosContext = React.createContext<TodoContextObj>({
  items: [],
  addTodo: () => {},
//   removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<Props> = (props) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodoHandler = (title: string, description: string, date: string, uid: string) => {
    setTodos((prevTodos) => {
      return prevTodos.concat(new TodoItem(title, description, date, uid));
    });
  };

//   const removeTodoHanler = (id: string) => {
//     setTodos((prevTodos) => {
//       return prevTodos.filter((todo) => todo.uid !== id);
//     });
//   };

  const contextValue: TodoContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    // removeTodo: removeTodoHanler
  };

  return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>;
};

export default TodosContextProvider