const dotenv = require('dotenv').config();

module.exports = {
  mongoUrl: process.env.mongourl,
  mongoDevUrl: process.env.mongotesturl,
  secret: process.env.bcrypt_secret_key,
  times: parseInt(process.env.salt_times),
  adminEmail: process.env.adminEmail,
  adminPassword: process.env.adminPassword,
};
