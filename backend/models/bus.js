const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const busSchema = new Schema({
  name: { type: String, required: true },
  bus_no: { type: Number, required: true },
  src: { type: String, required: true },
  dest: { type: String, required: true },
  bus_time: { type: Date, required: true },
});

module.exports = mongoose.model('Bus', busSchema);
