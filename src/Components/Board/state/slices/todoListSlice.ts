import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Columns, ColumnsData, TodoList } from "../../types";

export interface TodoListState {
  items: ColumnsData;
  isLoading: boolean;
  error: Error | null;
}

const initialState: TodoListState = {
  items: {
    [Columns.Todo]: {
      title: "To-do",
      items: [],
    },
    [Columns.InProgress]: {
      title: "In Progress",
      items: [],
    },
    [Columns.Done]: {
      title: "Done",
      items: [],
    },
  },
  isLoading: false,
  error: null,
};

const todoListSlice = createSlice({
  name: "todo-list",
  initialState,
  reducers: {
    fetchBegin(state) {
      state.isLoading = true;
    },
    fetchSuccess(state: TodoListState, action: PayloadAction<TodoList[]>) {
      state.isLoading = false;
      state.items[Columns.Todo].items = action.payload;
    },

    update(state: TodoListState, action: PayloadAction<ColumnsData>) {
      state.items = action.payload;
    },

    reset() {
      return initialState;
    },

    fetchFailure(state: TodoListState, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBegin, fetchSuccess, fetchFailure, update, reset } = todoListSlice.actions;

export default todoListSlice.reducer;
