const Admin = require('../models/admin');
const Bus = require('../models/bus');
const Ticket = require('../models/ticket');
const Passenger = require('../models/passenger');
const HttpError = require('../models/http-error');

const createNewAdmin = (email, password) => {
  let admin;
  admin = new Admin({
    email,
    password,
  });
  return admin;
};

const findAdminById = async (adminId) => {
  let admin;
  admin = await Admin.findById(adminId);
  if (!admin) {
    const error = new HttpError(
      'Could not find admin for the provided id.',
      404
    );
    throw error;
  }
  return admin;
};

const findAdminByEmail = async (adminMail) => {
  let admin;
  admin = await Admin.findOne({ email: adminMail });
  return admin;
};

const createNewBus = (name, bus_no, fare, src, dest, src_time, dest_time) => {
  let bus;
  bus = new Bus({
    name,
    bus_no,
    fare,
    src,
    dest,
    src_time,
    dest_time,
    tickets: [],
  });
  return bus;
};

const findBusById = async (busId) => {
  let bus;
  bus = await Bus.findById(busId)
    .populate('tickets')
    .populate({
      path: 'tickets',
      populate: { path: 'passenger' },
    })
    .populate({
      path: 'tickets',
      populate: { path: 'bus' },
    })
    .exec();
  if (!bus) {
    throw new HttpError('Could not find the bus for the provided id.', 404);
  }
  return bus;
};

const findBuses = async (src, dest) => {
  let buses;
  buses = await Bus.find({ src: src, dest: dest });
  if (!buses) {
    throw new HttpError('Could not find the bus for the provided id.', 404);
  }
  return buses;
};

const removeBusAndTickets = async (busId) => {
  let bus;
  bus = await Bus.findById(busId);
  if (!bus) throw new HttpError('Could not find Bus', 404);
  await Ticket.deleteMany({ _id: { $in: bus.tickets } });
  await bus.remove();
};

const findTicketById = async (ticketId) => {
  let ticket;
  ticket = await Ticket.findById(ticketId)
    .populate('bus')
    .populate('passenger')
    .exec();
  if (!ticket) {
    throw new HttpError('Ticket Not Found', 404);
  }
  return ticket;
};

const insertManyPassenger = async (passengers) => {
  let insertedIds = await Passenger.insertMany(passengers);
  return insertedIds;
};

const createTicket = (bus, seat_no, passenger) => {
  let ticket;
  ticket = new Ticket({ bus, seat_no, passenger });
  return ticket;
};
const insertManyTickets = async (tickets) => {
  let insertedIds = await Ticket.insertMany(tickets);
  return insertedIds;
};

const insertTicketsIntoBus = async (bus, tickets) => {
  bus.tickets.push({ $each: tickets });
  await bus.save();
};

exports.createNewAdmin = createNewAdmin;
exports.findAdminById = findAdminById;
exports.findAdminByEmail = findAdminByEmail;
exports.createNewBus = createNewBus;
exports.findBusById = findBusById;
exports.findBuses = findBuses;
exports.removeBusAndTickets = removeBusAndTickets;
exports.findTicketById = findTicketById;
exports.insertManyPassenger = insertManyPassenger;
exports.createTicket = createTicket;
exports.insertManyTickets = insertManyTickets;
exports.insertTicketsIntoBus = insertTicketsIntoBus;
