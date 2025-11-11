const express = require("express");
const router = express.Router();

const bookingControl = require("../controllers/bookingController");

//Our authorization MW checks if the user is logged in
const authMw = require("../middleware/authMiddleware");

router.post("/", authMw, bookingControl.create);
router.get("/my", authMw, bookingControl.getMy);
router.patch("/:id/cancel", authMw, bookingControl.cancel);
router.patch("/:id/confirm", authMw, bookingControl.confirm);

module.exports = router;
