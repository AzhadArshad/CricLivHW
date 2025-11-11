const express = require("express");
const router = express.Router();

const groundControl = require("../controllers/groundController");

//Our authorization MW checks if the user is logged in
const authMw = require("../middleware/authMiddleware");

//Our checks the right role admin or user
const roleMw = require("../middleware/roleMiddleware");

router.get("/", groundControl.getAll);

router.post("/", authMw, roleMw("admin"), groundControl.create);

router.put("/:id", authMw, roleMw("admin"), groundControl.update);

router.delete("/:id", authMw, roleMw("admin"), groundControl.deleteGround);

router.get("/:id", authMw, groundControl.getGround);

module.exports = router;
