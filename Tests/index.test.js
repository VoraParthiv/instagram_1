/* eslint-disable no-undef */
const { connectToDatabase, dropCollectionOfDatabase } = require('../server');

beforeAll(async () => {
  await connectToDatabase();
});
afterAll(async () => {
  await dropCollectionOfDatabase();
});

require('./admin');
require('./user');
require('./post');
require('./comment');
require('./like');
require('./group');
require('./action');
require('./interest');
require('./message');
require('./profile');
