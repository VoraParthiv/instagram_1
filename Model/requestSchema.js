const mongoose = require('mongoose');

const followRequest = new mongoose.Schema({
  followUserId: {
    type: mongoose.Types.ObjectId,
  },
  followingUserId: {
    type: mongoose.Types.ObjectId,
  },
  requestStatus: {
    type: String,
    default: 'Requested',
  },
});

const model = mongoose.model('followRequest', followRequest);
module.exports = model;
