const mongoose = require('mongoose');

const message = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Types.ObjectId,
  },
  toUserId: {
    type: mongoose.Types.ObjectId,
  },
  groupId: {
    type: mongoose.Types.ObjectId,
  },
  roomId: {
    type: String,
  },
  message: {
    type: String,
  },
  messageType: {
    type: String,
  },
  messageTime: {
    type: Date,
    default: Date.now(),
  },
  messageLike: {
    type: [mongoose.Types.ObjectId],
  },
});

const model = mongoose.model('message', message);
module.exports = model;
