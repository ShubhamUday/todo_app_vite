const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const authMiddleware = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let verifiedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);

    req.userId = verifiedToken.userId;

    next();
  } catch (error) {
    res.send({
      success: false,
      message: "Invalid token auth",
    });
  }
};

module.exports = {
  authMiddleware,
};
