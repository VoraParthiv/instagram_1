const mongoose = require('mongoose');

const savePost = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  postId: {
    type: mongoose.Types.ObjectId,
  },
});

const model = mongoose.model('savePost', savePost);
module.exports = model;
