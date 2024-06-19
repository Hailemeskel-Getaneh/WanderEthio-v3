require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const registrationRoute = require('./routes/registrationRoute');
const questionRoute = require('./routes/questionRoute');
const bookingRoute = require('./routes/bookingRoute')
const contactRoute = require('./routes/contactRoute');


const connectDB = require('./config/db');


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

app.use('/api/register', registrationRoute);
app.use('/api/questions', questionRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/contact', contactRoute)



connectDB();
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
