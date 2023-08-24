const mongoose = require('mongoose');

const report = new mongoose.Schema({
  reportByUserId: {
    type: mongoose.Types.ObjectId,
  },
  postId: {
    type: mongoose.Types.ObjectId,
  },
  profileId: {
    type: mongoose.Types.ObjectId,
  },
  reportType: {
    type: String,
  },
  reason: {
    type: String,
  },
});

const model = mongoose.model('report', report);
module.exports = model;
