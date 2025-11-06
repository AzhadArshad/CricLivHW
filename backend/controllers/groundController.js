const groundModel = require("../models/groundModel");

// get all grounds
const getAll = async (req, res) => {
  const grounds = await groundModel.getAll();
  res.json(grounds);
};

// admin creates a new facility / ground
const create = async (req, res) => {
  const ground = await groundModel.create(req.body, req.user.user_id);
  res.status(201).json(ground);
};

module.exports = { getAll, create };
