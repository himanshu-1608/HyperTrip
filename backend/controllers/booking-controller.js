const HttpError = require('../models/http-error');
const {
  findBusById,
  createTicket,
  insertManyPassenger,
  insertManyTickets,
  insertTicketsIntoBus,
} = require('../utils/db-utils');
const { sendEmail } = require('../utils/node-mailer');

const bookTicket = async (req, res, next) => {
  const { busId, seats, passengers, email } = req.body;

  let ticketIds, passengerIds, tickets, bus;
  try {
    bus = await findBusById(busId);
    passengerIds = await insertManyPassenger(passengers);
    tickets = passengerIds.map((passenger, index) => {
      return createTicket(bus, seats[index], passenger);
    });
    ticketIds = await insertManyTickets(tickets);
    await insertTicketsIntoBus(bus, ticketIds);

    const textEmail =
      'Hello Dear User, your ticket IDs are: ' +
      ticketIds.map((ticket) => ticket.id);

    sendEmail(email, 'Hyper Book Ticket Booking Service', textEmail);
  } catch (err) {
    if (err.code) {
      return next(err);
    }
    return next(new HttpError('Booking failed, please try again', 500));
  }
  res.status(200).json({ tickets: ticketIds.map((ticket) => ticket.id) });
};

exports.bookTicket = bookTicket;
