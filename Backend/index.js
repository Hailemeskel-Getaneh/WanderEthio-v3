
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const registrationRoute = require('./routes/registrationRoute');
const questionRoute = require('./routes/questionRoute');
const bookingRoute = require('./routes/bookingRoute');
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
app.use('/api/contact', contactRoute);

connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Express with dotenv and cors!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.post('/api/create-payment', async (req, res) => {
  const { amount, currency, email, first_name, last_name, tx_ref } = req.body;

  const paymentData = {
    amount,
    currency,
    email,
    first_name,
    last_name,
    tx_ref,
    callback_url: 'http://localhost:4000/api/payment-success',
    return_url: 'http://localhost:4000/api/payment-success',
    customization: {
      title: 'Booking Payment',
      description: 'Payment for booking services',
    },
  };

  try {
    console.log('Payment Data:', paymentData);

    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_TEST_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Chapa Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Payment initialization error:', error.message);
    if (error.response) {
      console.error('Chapa Error Response:', error.response.data);
    }
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

app.get('/api/payment-success', (req, res) => {
  res.send('Payment was successful!');
  res.send('your id is ${}')
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


















// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// const registrationRoute = require('./routes/registrationRoute');
// const questionRoute = require('./routes/questionRoute');
// const bookingRoute = require('./routes/bookingRoute');
// const contactRoute = require('./routes/contactRoute');
// const connectDB = require('./config/db');

// const app = express();
// app.use(express.json());
// const PORT = process.env.PORT || 4000;
// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/register', registrationRoute);
// app.use('/api/questions', questionRoute);
// app.use('/api/bookings', bookingRoute);
// app.use('/api/contact', contactRoute);

// connectDB();

// app.get('/', (req, res) => {
//   res.send('Hello from Express with dotenv and cors!');
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });


// app.post('/api/create-payment', async (req, res) => {
//   const { amount, currency, email, first_name, last_name, tx_ref } = req.body;

//   const paymentData = {
//     amount,
//     currency,
//     email,
//     first_name,
//     last_name,
//     tx_ref,
//     callback_url: 'http://localhost:4000/api/payment-success',
//     return_url: 'http://localhost:4000/api/payment-success',
//     customization: {
//       title: 'Booking Payment',
//       description: 'Payment for booking services',
//     },
//   };

//   try {
//     console.log('Payment Data:', paymentData);

//     const response = await axios.post(
//       'https://api.chapa.co/v1/transaction/initialize',
//       paymentData,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_TEST_SECRET_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('Chapa Response:', response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Payment initialization error:', error.message);

//     if (error.response) {
//       console.error('Chapa Error Response:', error.response.data);
//       res.status(500).json({ error: 'Payment initialization failed', details: error.response.data });
//     } else {
//       res.status(500).json({ error: 'Payment initialization failed' });
//     }
//   }
// });



// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

