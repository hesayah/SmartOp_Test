const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
  surgeon: String,
  specialty: String,
  anesthetist: String,
  nurse1: String,
  nurse2: String,
  roomNumber: Number,
  intervention: String,
});

const Intervention = mongoose.model('Intervention', interventionSchema);

module.exports = Intervention;
