const mongoose = require('mongoose');

const follow = new mongoose.Schema({
  followUserId: {
    type: mongoose.Types.ObjectId,
  },
  followingUserId: {
    type: mongoose.Types.ObjectId,
  },
});

const model = mongoose.model('follow', follow);
module.exports = model;
