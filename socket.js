const socketIo = require('socket.io')();

const socketApi = {
  io: socketIo,
};

module.exports = socketApi;
