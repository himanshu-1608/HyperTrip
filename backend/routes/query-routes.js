const express = require('express');

const queryController = require('../controllers/query-controller');

const router = express.Router();

router.post('/getBuses', queryController.getBuses);
router.get('/ticketInfo/:ticketId', queryController.getTicketInfo);

router.get('/bus/:busId', queryController.getBusById);

module.exports = router;
