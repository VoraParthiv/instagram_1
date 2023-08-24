const mongoose = require('mongoose');

const blockByUser = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  blockUserId: {
    type: mongoose.Types.ObjectId,
  },
});

const model = mongoose.model('blockByUser', blockByUser);
module.exports = model;
