//All ourSQL queries for users table at one place
const pool = require("../db/connection");
const bcrypt = require("bcryptjs");

// Creating a new user into our  users Table
const create = async ({ username, email_id, my_password }) => {
  const hash = await bcrypt.hash(my_password, 10);
  const [res] = await pool.execute(
    "INSERT INTO users (username, email_id, my_password) VALUES (?, ?, ?)",
    [username, email_id, hash]
  );
  return { user_id: res.insertId, username, email_id };
};

// Query to Find user by given email
const findByEmail = async (email_id) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email_id = ?", [
    email_id,
  ]);
  return rows[0];
};

// Query to Find user by given id
const findById = async (user_id) => {
  const [rows] = await pool.execute(
    "SELECT user_id, username, email_id, user_role FROM users WHERE user_id = ?",
    [user_id]
  );
  return rows[0];
};

module.exports = { create, findByEmail, findById };
