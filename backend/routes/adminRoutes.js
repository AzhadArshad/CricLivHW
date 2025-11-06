const express = require("express");
const router = express.Router();

//Our authorization MW checks if the user is logged in
const authMw = require("../middleware/authMiddleware");

//Our checks the right role admin or user
const roleMw = require("../middleware/roleMiddleware");

router.get("/", authMw, roleMw("admin"), (req, res) => {
  res.json({ message: "Admin panel" });
});

module.exports = router;
