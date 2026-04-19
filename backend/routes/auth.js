const router = require("express").Router();
const User   = require("../models/User");

// Called after Firebase login — saves user to MongoDB
router.post("/sync", async (req, res) => {
  const { firebaseId, email, name } = req.body;

  if (!firebaseId || !email)
    return res.status(400).json({ message: "firebaseId and email required" });

  try {
    let user = await User.findOne({ firebaseId });

    if (!user) {
      user = await User.create({ firebaseId, email, name: name || "" });
      console.log("New user saved to MongoDB:", email);
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user role by firebaseId
router.get("/role/:firebaseId", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.params.firebaseId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;