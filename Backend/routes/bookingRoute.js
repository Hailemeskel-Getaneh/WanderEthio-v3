// routes/bookingRoute.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel'); 
// Save booking details to the database
router.post('/bookings', async (req, res) => {
  const bookingData = req.body;

  try {
    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).json({ message: 'Booking saved successfully!', booking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Error saving booking. Please try again.' });
  }
});

module.exports = router;
