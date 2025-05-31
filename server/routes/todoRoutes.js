const express = require("express");
const {
  addTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
  getAllTodoByUser,
} = require("../controllers/TodoController");
const TodoRouter = express.Router();

TodoRouter.post("/add-todo", addTodo);
TodoRouter.get("/get-all-todo", getAllTodo);
TodoRouter.put("/update-todo", updateTodo);
TodoRouter.delete("/delete-todo", deleteTodo);
TodoRouter.post("/get-all-todo-by-user", getAllTodoByUser);

module.exports = TodoRouter;
