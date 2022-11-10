import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TodoItem } from '../models/todo'
import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";


const Todos: TodoItem[] = []
const [user] = useAuthState(auth);


const getTodos = async () => {
const q = query(collection(db, "todos"), where("uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      Todos.push(doc.data())
    });
    return Todos
}

// let initialState = []

const todoSlice = createSlice({
  name: "todos",
  initialState: getTodos(),
  reducers: {
    // removeTodo(state, id) {
    //   console.log(id);
    //   return state.filter((element) => element.id !== id.payload);
    // },
    addTodo(state, item) {
      state.push(item.payload);
    }
  },
});

const store = configureStore({
  reducer: todoSlice.reducer,
});

export const todoActions = todoSlice.actions;
export default store;