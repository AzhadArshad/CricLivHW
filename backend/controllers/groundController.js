// controllers/groundController.js
const groundModel = require("../models/groundModel");
const { getUpload } = require("../utils/uploadHelp");
const path = require("path");
const fs = require("fs");
const pool = require("../db/connection");

// Reuse multer for grounds
const upload = getUpload("grounds");

// CREATE GROUND
const create = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    const data = req.body;
    const admin_id = req.user.user_id;

    try {
      // 1. Create ground (default image)
      const ground = await groundModel.create(data, admin_id);

      // 2. Handle uploaded file
      if (req.file) {
        const finalPath = path.join(
          __dirname,
          `../../frontend/public/grounds/${ground.ground_id}.jpg`
        );
        fs.renameSync(req.file.path, finalPath);

        // Update DB
        await pool.execute(
          `UPDATE grounds SET image_filename = ? WHERE ground_id = ?`,
          [`${ground.ground_id}.jpg`, ground.ground_id]
        );

        ground.image_filename = `${ground.ground_id}.jpg`;
      }

      res.status(201).json(ground);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  });
};

const getAll = async (req, res) => {
  try {
    const grounds = await groundModel.getAll();
    res.json(grounds);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAll, create };
