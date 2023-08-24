/* eslint-disable no-undef */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { url, getToken } = require('../apiUrl');

describe('This is user message block', () => {
  const name = 'brijesh';
  test('GET /chat/list for get users list', async () => {
    const userResult = getToken(name);
    const response = await axios.get(`${url}/chat/list`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data).toBeDefined();
  });
  test('PUT /chat/like for like on message', async () => {
    const userResult = getToken(name);
    const data = {
      messageId: '648c31a4f2e8023501b069c3',
    };
    const response = await axios.put(`${url}/chat/like`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Message like');
  });
  test('GET /chat/like/view/{messageId} for get users list', async () => {
    const userResult = getToken(name);
    const messageId = '648812e7cac71ceed378d9dd';
    const response = await axios.get(`${url}/chat/like/view/${messageId}`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data).toBeDefined();
  });
});
