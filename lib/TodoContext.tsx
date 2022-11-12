import { TodoItem } from "../models/todo";
import { useState, createContext } from "react";

type TodoContextObj = {
    items: TodoItem[],
    addTodo: (title: string, description: string, date: string, uid: string) => void,
    removeTodo: (id: string) => void,
}

type Props = {
    children?:
      | React.ReactChild
      | React.ReactChild[];
  }; 

export const TodosContext = createContext<TodoContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {}
//   removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<Props> = (props) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // const addTodoHandler = (title: string, description: string, date: string, uid: string) => {
  //   setTodos((prevTodos) => {
  //     return prevTodos.concat(new TodoItem(title, description, date, uid));
  //   });
  const addTodoHandler = (title: string, description: string, date: string, uid: string) => {
    console.log("in contect", todos)
    setTodos((prevTodos) => {
      return [...prevTodos, new TodoItem(title, description, date, uid)];
    });
  };

  const removeTodoHanler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.todoId !== id);
    });
  };

  const contextValue: TodoContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHanler
  };

  return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>;
};

export default TodosContextProvider