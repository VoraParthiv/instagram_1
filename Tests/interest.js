/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { url, getToken } = require('../apiUrl');

let topicId = null;
let langId = null;
describe('This is topic, language, and user location add by add by Admin block', () => {
  const name = 'admin';
  test('POST /admin/topic for add topic lists by Admin', async () => {
    const userResult = getToken(name);
    const data = {
      topicName: 'Singer',
    };
    const response = await axios.post(`${url}/admin/topic`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    topicId = response.data.data._id;
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Topic are add successfully...!');
  });
  test('POST /admin/language for add language lists by Admin', async () => {
    const userResult = getToken(name);
    const data = {
      languageName: 'Hindi',
    };
    const response = await axios.post(`${url}/admin/language`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    langId = response.data.data._id;
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Language are add successfully...!');
  });
  test('POST /admin/location for add location of users by Admin', async () => {
    const userResult = getToken(name);
    const data = {
      userId: userResult.id,
      longitude: -74.05,
      latitude: 40.75,
    };
    const response = await axios.post(`${url}/admin/location`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Location are add successfully...!');
  });
  const userName = 'brijesh';
  test('GET /user/topic/list for display topic list for users', async () => {
    const userResult = getToken(userName);
    const response = await axios.get(`${url}/user/topic/list`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data[0]).toHaveProperty('topicName');
  });
  test('GET /user/language/list for display topic list for users', async () => {
    const userResult = getToken(userName);
    const response = await axios.get(`${url}/user/language/list`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data[0]).toHaveProperty('languageName');
  });
});

describe('This is selection block by User (topic and language)', () => {
  const userName = 'brijesh';
  test('POST /user/topic/select for user select its topics', async () => {
    const userResult = getToken(userName);
    const data = {
      topicId,
    };
    const response = await axios.post(`${url}/user/topic/select`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      status: 'Success',
      message: 'Your topic are selected',
    });
  });
  test('POST /user/language/select for user select its language', async () => {
    const userResult = getToken(userName);
    const data = {
      langId,
    };
    const response = await axios.post(`${url}/user/language/select`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      status: 'Success',
      message: 'Your language are selected',
    });
  });
});

describe('This is find similarly interest of Users block', () => {
  const userName = 'brijesh';
  test('GET /action/similarly for find all users of similarly interest', async () => {
    try {
      const userResult = getToken(userName);
      const response = await axios.get(`${url}/action/similarly`, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.data).toBeDefined();
    } catch (error) {
      expect(error.response.status).toBe(500);
      expect(error.response.data.status).toBe('Error');
      expect(error.response.data.message).toBeDefined();
    }
  });
  test('GET /action/similarly for if users not found of user interest', async () => {
    try {
      const userResult = getToken(userName);
      const response = await axios.get(`${url}/action/similarly`, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.data).toBeDefined();
    } catch (error) {
      expect(error.response.status).toBe(500);
      expect(error.response.data.status).toBe('Error');
      expect(error.response.data.message).toBeDefined();
    }
  });
});
