const HttpError = require('../models/http-error');
const {} = require('../utils/db-utils');

const bookTicket = async (req, res, next) => {
  const { busId, seats, users } = req.body;
  console.log(busId, seats, users);
  res.status(200).json({ created: true });
};

exports.bookTicket = bookTicket;
