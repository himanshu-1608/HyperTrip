const HttpError = require('../models/http-error');
const { findTicketById } = require('../utils/db-utils');

const getTicketInfo = async (req, res, next) => {
  const ticketId = req.params.ticketId;
  let ticket;
  try {
    ticket = await findTicketById(ticketId);
  } catch (err) {
    return next(err);
  }
  res.status(200).json({ ticket: ticket });
};

exports.getTicketInfo = getTicketInfo;
