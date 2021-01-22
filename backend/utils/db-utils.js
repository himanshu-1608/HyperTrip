const Admin = require('../models/admin');
const Bus = require('../models/bus');
const Ticket = require('../models/bus');
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

const createNewBus = (name, bus_no, src, dest, bus_time) => {
  let bus;
  bus = new Bus({ name, bus_no, src, dest, bus_time, tickets: [] });
  return bus;
};

const findBusById = async (busId) => {
  let bus;
  bus = await Bus.findById(busId);
  if (!bus) {
    const error = new HttpError(
      'Could not find the bus for the provided id.',
      404
    );
    throw error;
  }
  return bus;
};

const removeBusAndTickets = async (busId) => {
  let bus;
  bus = await Bus.findById(busId);
  if (!bus) throw new HttpError('Could not find Bus', 404);
  await Ticket.deleteMany({ _id: { $in: bus.tickets } });
  await bus.remove();
};

exports.createNewAdmin = createNewAdmin;
exports.findAdminById = findAdminById;
exports.findAdminByEmail = findAdminByEmail;
exports.createNewBus = createNewBus;
exports.findBusById = findBusById;
exports.removeBusAndTickets = removeBusAndTickets;
