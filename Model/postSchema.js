const mongoose = require('mongoose');

const post = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  postImage: {
    type: String,
  },
  postType: {
    type: String,
  },
  description: {
    type: String,
  },
  postTime: {
    type: Date,
    default: Date.now(),
  },
});

const model = mongoose.model('post', post);
module.exports = model;
