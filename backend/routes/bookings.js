const router  = require("express").Router();
const Booking = require("../models/Booking");
const User    = require("../models/User");

// GET booked slots for a service on a date
router.get("/slots", async (req, res) => {
  const { serviceId, date } = req.query;

  if (!serviceId || !date)
    return res.status(400).json({ message: "serviceId and date required" });

  try {
    const bookings = await Booking.find({ serviceId, date });
    const takenSlots = bookings.map(b => b.timeSlot);
    res.json({ takenSlots });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a booking
router.post("/", async (req, res) => {
  const { firebaseId, serviceId, date, timeSlot } = req.body;

  if (!firebaseId || !serviceId || !date || !timeSlot)
    return res.status(400).json({ message: "All fields required" });

  try {
    // Find user in MongoDB
    const user = await User.findOne({ firebaseId });
    if (!user)
      return res.status(404).json({ message: "User not found. Please login again." });

    // Create booking — unique index will reject duplicates
    const booking = await Booking.create({
      userId: user._id,
      serviceId,
      date,
      timeSlot,
    });

    res.status(201).json({ message: "Booking confirmed! ✅", booking });

  } catch (err) {
    // Duplicate key = slot already taken
    if (err.code === 11000)
      return res.status(409).json({ message: "Slot already booked. Please choose another." });

    res.status(500).json({ message: err.message });
  }
});

// GET all bookings for a user
router.get("/my/:firebaseId", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.params.firebaseId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const bookings = await Booking.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;