const TodoModel = require("../models/todoModel");

const addTodo = async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);
    await newTodo.save();
    res.send({
      success: true,
      message: "Todo added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    const todos = await TodoModel.find().populate("user"); // populate will render userModel in owner
    res.send({
      success: true,
      message: "Todo's fetched successfully",
      data: todos,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    console.log("update route back", req.body);
    await TodoModel.findByIdAndUpdate(req.body.todoId, req.body);

    res.send({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    console.log(req.body);
    const todo = await TodoModel.findById(req.body.todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await TodoModel.findByIdAndDelete(req.body.todoId);
    res.send({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getAllTodoByUser = async (req, res) => {
  try {
    // console.log('todocontroller', req.body)
    const allTodo = await TodoModel.find({ userId: req.body.user });
    // console.log('resp find allTodo', allTodo)
    res.send({
      success: true,
      message: "All todo's by user fetched successfully",
      data: allTodo,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
  getAllTodoByUser,
};
