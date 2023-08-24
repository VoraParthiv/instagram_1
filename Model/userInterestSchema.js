const mongoose = require('mongoose');

const userInterest = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  topicId: {
    type: mongoose.Types.ObjectId,
  },
  langId: {
    type: mongoose.Types.ObjectId,
  },
});

const model = mongoose.model('userInterest', userInterest);
module.exports = model;
