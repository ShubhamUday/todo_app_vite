const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Route for Register
const registerController = async (req, res) => {
  try {
    const userExists = await UserModel.findOne({ email: req.body.email });

    if (userExists) {
      res.send({ success: false, message: "User already exists " });
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new UserModel(req.body);
    await newUser.save(); // Saves the data in the database

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user: newUser,
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.send({
        success: false,
        message: "You are not registered please register first",
      });
    }
    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry, invalid entered",
      });
    }

    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "User logged in",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  const user = await UserModel.findById(req.userId).select("-password");

  res.send({
    success: true,
    message: "User Authorised for Protected Route",
    data: user,
  });
};

module.exports = {
  loginController,
  registerController,
  getCurrentUser,
};
