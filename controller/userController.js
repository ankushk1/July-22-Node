const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // If the user is already signed up?
    const isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      return res.status(400).json({
        message: "User already exists with same email, Try signin"
      });
    }
    const encPass = bcrypt.hashSync(req.body.password, saltrounds);
    const newUser = await User.create({ ...req.body, password: encPass });
    if (!newUser) {
      return res.status(400).json({
        message: "User creation failed"
      });
    }
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

exports.signin = async (req, res) => {
  try {
    // Check if the user is signed up or not?
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist, Please signup first" });
    }

    // Match the password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const { _id, firstname, email } = user;

    const token = jwt.sign({ _id, firstname, email }, 
      req.app.get("privateKey")
      , {
      expiresIn: "2h"
    });

    return res.status(200).json({
      token,
      message: "Signin successful"
    });
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};
