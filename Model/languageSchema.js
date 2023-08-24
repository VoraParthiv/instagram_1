const mongoose = require('mongoose');

const language = new mongoose.Schema({
  languageName: {
    type: String,
  },
});

const model = mongoose.model('language', language);
module.exports = model;
