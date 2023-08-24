const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  contact: {
    type: Number,
  },
  profile: {
    type: String,
    default: 'Public',
  },
});

const model = mongoose.model('user', user);
module.exports = model;
