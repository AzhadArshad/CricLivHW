const pool = require("../db/connection");

//get all grounds
const getAll = async () => {
  const [rows] = await pool.execute("SELECT * FROM grounds");
  return rows;
};

// Create a new ground/ facility - only admin can do this
const create = async (data, admin_id) => {
  const [res] = await pool.execute(
    `INSERT INTO grounds
     (ground_name, location, admin_id, description_ground, price_per_hour, image_filename)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.ground_name,
      data.location,
      admin_id,
      data.description_ground,
      data.price_per_hour,
      data.image_filename || "default.jpg", // fallback
    ]
  );
  return { ground_id: res.insertId, ...data, admin_id };
};

const getGround = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM grounds WHERE ground_id = ?",
    [id]
  );
  return rows[0]; // return a single ground object, not an array
};

//returns grounds of an admin
const getGroundbyAdmin = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM grounds WHERE admin_id = ?",
    [id]
  );
  return rows;
};

const updateGround = async (id, fields) => {
  const {
    ground_name,
    location,
    description_ground,
    price_per_hour,
    image_filename,
  } = fields;
  await pool.execute(
    `UPDATE grounds SET 
      ground_name = ?, 
      location = ?, 
      description_ground = ?, 
      price_per_hour = ?, 
      image_filename = ?
     WHERE ground_id = ?`,
    [
      ground_name,
      location,
      description_ground,
      price_per_hour,
      image_filename,
      id,
    ]
  );
  const [rows] = await pool.execute(
    "SELECT * FROM grounds WHERE ground_id = ?",
    [id]
  );
  return rows[0];
};

module.exports = { getAll, create, getGround, getGroundbyAdmin, updateGround };
