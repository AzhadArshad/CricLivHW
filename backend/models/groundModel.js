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

module.exports = { getAll, create };
