const mongoose = require('mongoose');

const location = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  location: {
    type: Object,
  },
});

const model = mongoose.model('location', location);
module.exports = model;
