const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    tickets: { type: Number, required: true },
    destination: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentIntentId: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
