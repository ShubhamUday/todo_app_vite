import { axiosInstance } from "./index";

export const addTodo = async (payload) => {
  try {
    const response = await axiosInstance.post("/todo/add-todo", payload);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateTodo = async (payload) => {
  try {
    const response = await axiosInstance.put("/todo/update-todo", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const deleteTodo = async (payload) => {
  try {
    console.log(payload.todoId)
    const response = await axiosInstance.delete("/todo/delete-todo", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getAllTodoByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/todo/get-all-todo-by-user",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
