import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "./Components/Board/state/slices/todoListSlice";

export const store = configureStore({
  reducer: {
    todoList: todoListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
