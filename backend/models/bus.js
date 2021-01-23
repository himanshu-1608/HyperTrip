const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const busSchema = new Schema({
  name: { type: String, required: true },
  bus_no: { type: String, required: true },
  src: { type: String, required: true },
  dest: { type: String, required: true },
  src_time: { type: Date, required: true },
  dest_time: { type: Date, required: true },
  tickets: [{ type: mongoose.Types.ObjectId, ref: 'Ticket' }],
});

module.exports = mongoose.model('Bus', busSchema);
