const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Route to add a new registration
router.post('/registration', async (req, res) => {
  const {
    fullName, email, phone, nationality, passport, dob, gender,
    country, address, zip, city, emergencyContact, emergencyPhone,password, allergies
  } = req.body;

  const newRegistration = new Registration({
    fullName, email, phone, nationality, passport, dob, gender,
    country, address, zip, city, emergencyContact, emergencyPhone,password, allergies
  });

  try {
    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving registration', error: error.message });
  }
});

// Route to check if a user is registered
router.post('/check-registration', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Registration.findOne({ email });
    if (user) {
      res.json({ registered: true, discount: 0.1 });
    } else {
      res.json({ registered: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking registration', error: error.message });
  }
});

module.exports = router;





// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && user.password === password) {
//       res.status(200).json({ message: "Login successful" });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });