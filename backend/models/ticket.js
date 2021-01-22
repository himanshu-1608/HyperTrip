const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  bus_no: { type: Number, required: true },
  seat_no: { type: Number, required: true },
  passenger: { type: mongoose.Types.ObjectId, ref: 'Passenger' },
  fare: { type: NumberDecimal, required: true },
  bus_time: { type: Date, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);
