const express = require("express");
const UserRouter = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
// const { getAllUser } = require("../controllers/OwnerController");

// UserRouter.get("/get-all-users", authMiddleware, getAllUser);

module.exports = UserRouter;
