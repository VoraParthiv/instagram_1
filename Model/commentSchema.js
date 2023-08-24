const mongoose = require('mongoose');

const comment = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
  },
  comment: {
    type: String,
  },
  commentByUserId: {
    type: mongoose.Types.ObjectId,
  },
  commentTime: {
    type: Date,
    default: Date.now(),
  },
});

const model = mongoose.model('comment', comment);
module.exports = model;
