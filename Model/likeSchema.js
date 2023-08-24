const mongoose = require('mongoose');

const like = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
  },
  likeByUserId: {
    type: mongoose.Types.ObjectId,
  },
});

const model = mongoose.model('like', like);
module.exports = model;
