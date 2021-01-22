const express = require('express');

const adminController = require('../controllers/admin-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.post('/addBus', adminController.addBus);
router.delete('/resetBus/:busId', adminController.resetBus);

module.exports = router;
