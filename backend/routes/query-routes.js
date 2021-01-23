const express = require('express');

const queryController = require('../controllers/query-controller');

const router = express.Router();

router.post('/getBuses', queryController.getBuses);
router.post('/ticketInfo/:ticketId', queryController.getTicketInfo);

module.exports = router;
