const mongoose = require('mongoose');

const admin = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const model = mongoose.model('admin', admin);
module.exports = model;
