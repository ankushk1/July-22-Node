const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltrounds = 10;

exports.signup = async (req, res) => {
  try {
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
