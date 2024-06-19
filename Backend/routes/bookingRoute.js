const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcontrollers');

// Define the booking route
router.post('/', bookingController.createBooking);

module.exports = router;
