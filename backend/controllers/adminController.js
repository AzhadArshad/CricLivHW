const bookingModel = require("../models/bookingModel");
const groundModel = require("../models/groundModel");

// Get all bookings for an admin's grounds
const getAdminBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getByAdmin(req.user.user_id);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all grounds owned by admin
const getAdminGrounds = async (req, res) => {
  try {
    const grounds = await groundModel.getGroundbyAdmin(req.user.user_id);
    res.json(grounds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminBookings, getAdminGrounds };
