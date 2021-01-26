const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth-controller');

const router = express.Router();

router.post(
  '/signup',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 5 }),
  ],
  authController.signup
);
router.post(
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 5 }),
  ],
  authController.login
);

module.exports = router;
