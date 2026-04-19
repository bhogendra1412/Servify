const router  = require("express").Router();
const Service = require("../models/Service");
const User    = require("../models/User");

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add service (admin only)
router.post("/", async (req, res) => {
  const { firebaseId, name, description, emoji, category, price, duration } = req.body;

  try {
    // Check if user is admin
    const user = await User.findOne({ firebaseId });
    if (!user || user.role !== "admin")
      return res.status(403).json({ message: "Not authorized. Admins only." });

    const service = await Service.create({
      name, description, emoji, category, price, duration
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;