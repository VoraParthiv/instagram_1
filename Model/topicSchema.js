const mongoose = require('mongoose');

const topic = new mongoose.Schema({
  topicName: {
    type: String,
  },
});

const model = mongoose.model('topic', topic);
module.exports = model;
