const express = require("express");
const AuthRouter = express.Router();
const {
  registerController,
  loginController,
  getCurrentUser,
} = require("../controllers/AuthController");
const { authMiddleware } = require("../middlewares/authMiddleware");

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);
AuthRouter.get("/get-current-user", authMiddleware, getCurrentUser);

module.exports = AuthRouter;
