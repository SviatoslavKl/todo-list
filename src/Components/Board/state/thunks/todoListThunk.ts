import { Dispatch } from "@reduxjs/toolkit";
import todoDataService from "../../../../Services/todoDataService";
import { fetchBegin, fetchFailure, fetchSuccess, update } from "../slices/todoListSlice";
import { DropResult } from "react-beautiful-dnd";
import { Columns } from "../../types";
import { RootState } from "../../../../store";

export const fetchTodoListAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchBegin());
  try {
    const { data } = await todoDataService.getTodoList();
    dispatch(fetchSuccess(data));
  } catch (e) {
    dispatch(fetchFailure(e as Error));
  }
};

export const updateTodoListAction = (result: DropResult) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    if (!result.destination) return;
    const { source, destination } = result;
    const columns = getState().todoList.items;

    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === Columns.Todo) return;

      const destColumn = columns[destination.droppableId as Columns];
      const sourceColumn = columns[source.droppableId as Columns];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      dispatch(
        update({
          ...columns,
          [source.droppableId]: { ...sourceColumn, items: sourceItems },
          [destination.droppableId]: { ...destColumn, items: destItems },
        }),
      );
    } else {
      const column = columns[source.droppableId as Columns];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      dispatch(update({ ...columns, [source.droppableId]: { ...column, items: copiedItems } }));
    }
  } catch (e) {
    dispatch(fetchFailure(e as Error));
  }
};

export const removeItemFromListAction =
  (id: number, column: Columns) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const columns = getState().todoList.items;
      dispatch(
        update({
          ...columns,
          [column]: { ...columns[column], items: columns[column].items.filter((item) => item.id !== id) },
        }),
      );
    } catch (e) {
      dispatch(fetchFailure(e as Error));
    }
  };
export const removeFromColumnAction = (column: Columns) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const columns = getState().todoList.items;
    dispatch(update({ ...columns, [column]: { title: column, items: [] } }));
  } catch (e) {
    dispatch(fetchFailure(e as Error));
  }
};
