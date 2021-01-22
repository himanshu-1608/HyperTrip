const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, secret);
    req.adminData = { adminId: decodedToken.adminId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
