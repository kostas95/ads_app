const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  cost: {
    type: Number,
  },
  images: {
    type: Array,
  },
  // Reference to the user who created the ad
  createdBy: {
    type: String,
    required: true,
  },
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
