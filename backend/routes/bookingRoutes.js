const express = require("express");
const router = express.Router();

const bookingControl = require("../controllers/bookingController");

//Our authorization MW checks if the user is logged in
const authMw = require("../middleware/authMiddleware");

router.post("/", authMw, bookingControl.create); //creating a new booking
router.get("/my", authMw, bookingControl.getMy); // getting a made booking
router.patch("/:id/cancel", authMw, bookingControl.cancel); //cancelling a booking
router.patch("/:id/confirm", authMw, bookingControl.confirm); //confirming status of a pending booking

module.exports = router;
