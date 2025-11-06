// controllers/authController.js
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenUtils");

// A new user coming to sign up
const register = async (req, res) => {
  const { username, email_id, my_password } = req.body;
  if (!username || !email_id || !my_password) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    if (await userModel.findByEmail(email_id)) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await userModel.create({ username, email_id, my_password });
    const token = generateToken({ user_id: user.user_id, user_role: "user" });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// A Existing user Logging in
const login = async (req, res) => {
  const { email_id, my_password } = req.body;
  try {
    const user = await userModel.findByEmail(email_id);
    if (!user || !(await bcrypt.compare(my_password, user.my_password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({
      user_id: user.user_id,
      user_role: user.user_role,
    });
    res.json({
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        email_id: user.email_id,
        user_role: user.user_role,
      },
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const me = async (req, res) => {
  const user = await userModel.findById(req.user.user_id);
  res.json(user);
};

module.exports = { register, login, me };
