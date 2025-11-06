// utils/tokenUtils.js
const jwt = require("jsonwebtoken");

//payload is an object containing the information you want to store in the token, e.g. { id: user._id, role: user.role }
//We dont really have to do much as u can see jwt object just generates a token with in build '.sign for us'
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//This verifies the token and rerturns an error if not verified which we can catch in middleware
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
