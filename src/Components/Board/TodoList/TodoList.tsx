import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { bindActionCreators } from "@reduxjs/toolkit";

import TaskCard from "../TaskCard/TaskCard";
import { Column, Columns } from "../types";
import {
  fetchTodoListAction,
  removeFromColumnAction,
  removeItemFromListAction,
  updateTodoListAction,
} from "../state/thunks/todoListThunk";
import { AppDispatch, RootState } from "../../../store";
import { reset } from "../state/slices/todoListSlice";

import styles from "./todoList.module.scss";

const TodoList = (props: PropsFromRedux) => {
  const { fetchTodoList, removeItem, updateTodoList, columns, reset, isLoading, removeFromColumn } = props;

  useEffect(() => {
    fetchTodoList();
    return () => {
      reset();
    };
  }, [fetchTodoList, reset]);

  const onRemoveRow = () => {
    removeFromColumn(Columns.Done);
  };

  const renderColumns = ([columnId, column]: [string, Column]) => {
    return (
      <Droppable key={columnId} droppableId={columnId}>
        {(provided) => (
          <div className={styles.list} ref={provided.innerRef} {...provided.droppableProps}>
            <div className={styles.title}>{column.title}</div>
            {column.items.map((item, index) => (
              <TaskCard key={item.id} item={item} index={index} onRemove={removeItem} column={columnId as Columns} />
            ))}
            {provided.placeholder}
            {columnId === Columns.Done && !!column.items.length && (
              <button onClick={onRemoveRow}>Remove all items</button>
            )}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <DragDropContext onDragEnd={updateTodoList}>
      <div className={styles.root}>
        {isLoading && "Loading...."}
        {!isLoading && <div className={styles.container}>{Object.entries(columns).map(renderColumns)}</div>}
      </div>
    </DragDropContext>
  );
};

const mapStateToProps = (state: RootState) => ({
  columns: state.todoList.items,
  isLoading: state.todoList.isLoading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchTodoList: bindActionCreators(fetchTodoListAction, dispatch),
  updateTodoList: bindActionCreators(updateTodoListAction, dispatch),
  removeItem: bindActionCreators(removeItemFromListAction, dispatch),
  removeFromColumn: bindActionCreators(removeFromColumnAction, dispatch),
  reset: bindActionCreators(reset, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TodoList);
