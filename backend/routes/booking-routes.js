const express = require('express');

const bookingController = require('../controllers/booking-controller');

const router = express.Router();

router.post('/bookTicket', bookingController.bookTicket);

module.exports = router;
