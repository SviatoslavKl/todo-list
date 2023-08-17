import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";

import { TodoList } from "../types";
import { Columns } from "../types";

import styled from "./taskCard.module.scss";

interface TaskCardProps {
  item: TodoList;
  onRemove: (id: number, column: Columns) => void;
  index: number;
  column: Columns;
}
const TaskCard = (props: TaskCardProps) => {
  const { item, index, column, onRemove } = props;

  const onHandleRemove = () => {
    let isBoss = window.confirm("Are you wanna delete it?");
    isBoss && onRemove(item.id, column);
  };

  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div className={styled.root} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <p>{item.title}</p>
          {column === Columns.InProgress && <button onClick={onHandleRemove}>Remove</button>}
        </div>
      )}
    </Draggable>
  );
};

export default memo(TaskCard);
