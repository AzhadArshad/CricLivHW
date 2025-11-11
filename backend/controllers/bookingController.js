// controllers/bookingController.js
const bookingModel = require("../models/bookingModel");

// create new booking
const create = async (req, res) => {
  const { ground_id, booking_date, booking_time } = req.body;
  const user_id = req.user.user_id;

  //chceck for availability
  if (await bookingModel.isSlotTaken(ground_id, booking_date, booking_time)) {
    return res.status(409).json({ message: "Slot already booked" });
  }

  const booking = await bookingModel.create({
    user_id,
    ground_id,
    booking_date,
    booking_time,
  });
  res.status(201).json(booking);
};

// get a particular users booking
const getMy = async (req, res) => {
  const bookings = await bookingModel.getByUser(req.user.user_id);
  res.json(bookings);
};

// cancelling a booking
const cancel = async (req, res) => {
  const success = await bookingModel.cancel(req.params.id, req.user.user_id);
  if (!success)
    return res.status(404).json({
      message: "Not found",
      bookingId: req.params.id,
      userId: req.user.user_id,
    });
  res.json({ message: "Cancelled" });
};

// cancelling a booking
const confirm = async (req, res) => {
  const success = await bookingModel.confirm(req.params.id, req.user.user_id);
  if (!success)
    return res.status(404).json({
      message: "Not found",
      bookingId: req.params.id,
      userId: req.user.user_id,
    });
  res.json({ message: "Confirmed" });
};

module.exports = { create, getMy, cancel, confirm };
