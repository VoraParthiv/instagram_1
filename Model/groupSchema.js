const mongoose = require('mongoose');

const group = new mongoose.Schema({
  createUserId: {
    type: mongoose.Types.ObjectId,
  },
  groupName: {
    type: String,
  },
  addUser: {
    type: [mongoose.Types.ObjectId],
  },
  groupImage: {
    type: String,
  },
});

const model = mongoose.model('group', group);
module.exports = model;
