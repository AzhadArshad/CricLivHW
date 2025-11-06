const express = require("express");
const router = express.Router();

// our controlles which handles the logic
const authControl = require("../controllers/authController"); //our authorization controller

//Our authorization MW checks if the user is logged in
const authMw = require("../middleware/authMiddleware");

router.post("/register", authControl.register); // when a new user comes to register

router.post("/login", authControl.login); //when an old user comes to log back in

router.get("/me", authMw, authControl.me); // ? will be used for profile page

module.exports = router;
