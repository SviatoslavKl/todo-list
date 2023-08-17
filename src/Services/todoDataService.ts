import { ITodoDataService } from "./types";
import axios from "axios";

const todoDataService: ITodoDataService = {
  getTodoList() {
    return axios.get("https://jsonplaceholder.typicode.com/todos");
  },
};

export default todoDataService;
