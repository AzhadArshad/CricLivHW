// models/bookingModel.js
const pool = require("../db/connection");

// Create new booking
const create = async ({ user_id, ground_id, booking_date, booking_time }) => {
  const [res] = await pool.execute(
    `INSERT INTO bookings (user_id, ground_id, booking_date, booking_time)
     VALUES (?, ?, ?, ?)`,
    [user_id, ground_id, booking_date, booking_time]
  );
  return {
    booking_id: res.insertId,
    user_id,
    ground_id,
    booking_date,
    booking_time,
    status: "pending",
  };
};

// get booking of a particular user
const getByUser = async (user_id) => {
  const [rows] = await pool.execute(
    `SELECT b.*, g.ground_name 
     FROM bookings b 
     JOIN grounds g ON b.ground_id = g.ground_id 
     WHERE b.user_id = ? 
     ORDER BY b.booking_date DESC, b.booking_time`,
    [user_id]
  );
  return rows;
};

// a user cancels a booking
const cancel = async (booking_id, user_id) => {
  const [res] = await pool.execute(
    'UPDATE bookings SET status = "cancelled" WHERE booking_id = ? AND user_id = ?',
    [booking_id, user_id]
  );
  return res.affectedRows > 0;
};

// to check availability
const isSlotTaken = async (ground_id, booking_date, booking_time) => {
  const [rows] = await pool.execute(
    `SELECT booking_id FROM bookings 
     WHERE ground_id = ? AND booking_date = ? AND booking_time = ? 
     AND status != "cancelled"`,
    [ground_id, booking_date, booking_time]
  );
  return rows.length > 0;
};

module.exports = { create, getByUser, cancel, isSlotTaken };
