import { AxiosResponse } from "axios";
import { TodoList } from "../Components/Board/types";

export interface ITodoDataService {
  getTodoList: () => Promise<AxiosResponse<TodoList[]>>;
}
