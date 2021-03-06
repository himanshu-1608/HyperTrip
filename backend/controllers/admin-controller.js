const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const { createNewBus, removeTicketsFromBus } = require('../utils/db-utils');

const addBus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, bus_no, fare, src, dest, src_time, dest_time } = req.body;
  let bus;
  try {
    bus = createNewBus(name, bus_no, fare, src, dest, src_time, dest_time);
    await bus.save();
  } catch (err) {
    const error = new HttpError(
      'New bus creation failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(201).json({ created: true });
};

const resetBus = async (req, res, next) => {
  const busId = req.params.busId;
  try {
    await removeTicketsFromBus(busId);
  } catch (err) {
    if (err.code === 404) {
      return next(err);
    }
    const error = new HttpError(
      `Bus and it's ticket removal failed, please try again later.`,
      500
    );
    return next(error);
  }
  res.status(200).json({ removed: true });
};

exports.addBus = addBus;
exports.resetBus = resetBus;
