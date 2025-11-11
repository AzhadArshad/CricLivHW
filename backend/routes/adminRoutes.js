const express = require("express");
const router = express.Router();
const adminControl = require("../controllers/adminController");
const authMw = require("../middleware/authMiddleware");
//Our checks the right role admin or user
const roleMw = require("../middleware/roleMiddleware");

router.get("/bookings", authMw, roleMw("admin"), adminControl.getAdminBookings);
router.get("/grounds", authMw, roleMw("admin"), adminControl.getAdminGrounds);

module.exports = router;
