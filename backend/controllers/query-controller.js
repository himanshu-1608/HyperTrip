const HttpError = require('../models/http-error');
const { findTicketById, findBuses, findBusById } = require('../utils/db-utils');

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

const getBuses = async (req, res, next) => {
  const { src, dest } = req.body;
  let buses;
  try {
    buses = await findBuses(src, dest);
  } catch (err) {
    if (err.code) {
      return next(err);
    }
    const error = new HttpError(
      'New bus creation failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(200).json({ buses: buses });
};

const getBusById = async (req, res, next) => {
  const busId = req.params.busId;
  let bus;
  try {
    bus = await findBusById(busId);
  } catch (err) {
    if (err.code) {
      return next(err);
    }
    const error = new HttpError(
      'New bus creation failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(200).json({ bus: bus });
};

exports.getTicketInfo = getTicketInfo;
exports.getBuses = getBuses;
exports.getBusById = getBusById;
