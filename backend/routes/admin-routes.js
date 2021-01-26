const express = require('express');
const { check } = require('express-validator');

const adminController = require('../controllers/admin-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.post(
  '/addBus',
  [
    check('name').not().isEmpty(),
    check('bus_no').not().isEmpty(),
    check('fare').not().isEmpty(),
    check('src').not().isEmpty(),
    check('dest').not().isEmpty(),
    check('src_time').not().isEmpty(),
    check('dest_time').not().isEmpty(),
  ],
  adminController.addBus
);
router.delete('/resetBus/:busId', adminController.resetBus);

module.exports = router;
