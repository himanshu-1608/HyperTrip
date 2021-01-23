const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  bus: { type: mongoose.Types.ObjectId, ref: 'Bus' },
  seat_no: { type: Number, required: true },
  passenger: { type: mongoose.Types.ObjectId, ref: 'Passenger' },
});

module.exports = mongoose.model('Ticket', ticketSchema);
