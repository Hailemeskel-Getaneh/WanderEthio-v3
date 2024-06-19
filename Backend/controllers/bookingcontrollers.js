const Booking = require('../models/Booking');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createBooking = async (req, res) => {
    const { name, email, date, tickets, destination, totalAmount } = req.body;
    try {
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Stripe uses smallest currency unit
            currency: 'usd',
            payment_method_types: ['card']
        });

        // Create a booking record in the database
        const booking = new Booking({
            name,
            email,
            date,
            tickets,
            destination,
            amount: totalAmount,
            paymentIntentId: paymentIntent.id
        });
        await booking.save();

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
            ticketId: booking._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
