const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secret, times } = require('../config');

const hashPassword = async (password) => {
  let hashedPassword;
  hashedPassword = await bcrypt.hash(password, times);
  return hashedPassword;
};

const createToken = (userId, email) => {
  let token;
  token = jwt.sign(
    {
      userId,
      email,
    },
    secret
  );
  return token;
};

const checkPassword = async (password1, password2) => {
  return await bcrypt.compare(password1, password2);
};

exports.hashPassword = hashPassword;
exports.createToken = createToken;
exports.checkPassword = checkPassword;
