/* eslint-disable import/extensions */
/* eslint-disable prefer-const */

const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const server = http.createServer(app);

exports.connectToDatabase = async () => {
  server.listen(process.env.PORT);
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connect(process.env.TEST_MONGO_URI);
  } else {
    await mongoose.connect(process.env.DEV_MONGO_URI);
  }
};

exports.dropCollectionOfDatabase = async () => {
  await mongoose.connection.db.dropCollection('admins');
  await mongoose.connection.db.dropCollection('users');
  await mongoose.connection.db.dropCollection('posts');
  await mongoose.connection.db.dropCollection('comments');
  await mongoose.connection.db.dropCollection('likes');
  await mongoose.connection.db.dropCollection('groups');
  await mongoose.connection.db.dropCollection('blockbyusers');
  await mongoose.connection.db.dropCollection('reports');
  await mongoose.connection.db.dropCollection('saveposts');
  await mongoose.connection.db.dropCollection('topics');
  await mongoose.connection.db.dropCollection('languages');
  await mongoose.connection.db.dropCollection('locations');
  await mongoose.connection.db.dropCollection('userinterests');
  await mongoose.connection.db.dropCollection('messages');
  await mongoose.connection.db.dropCollection('followrequests');
  await mongoose.connection.db.dropCollection('follows');
  await mongoose.connection.close();
  server.close();
};
