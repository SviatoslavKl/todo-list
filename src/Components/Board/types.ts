export interface TodoList {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export enum Columns {
  Todo = "todo",
  InProgress = "inProgress",
  Done = "done",
}

export type ColumnsData = {
  [key in Columns]: Column;
};

export type Column = {
  title: string;
  items: TodoList[];
};
