/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { url, saveUsersToken } = require('../apiUrl');

let userToken = null;
let userId = null;

describe('User register API test block', () => {
  test('POST /user/register for user enter correct all details and it is not exists', async () => {
    const registerData = {
      name: 'brijesh',
      email: 'brijesh@gmail.com',
      password: '1410',
      contact: 1234567890,
    };
    const response = await axios.post(`${url}/user/register`, registerData);
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Success');
    expect(response.data.message).toBe('You have been successfully registered');
    expect(response.data.data).toBeDefined();
  });
  test('POST /user/register for user enter correct all details and already exists', async () => {
    try {
      const registerData = {
        name: 'brijesh',
        email: 'brijesh@gmail.com',
        password: '1410',
        contact: 1234567890,
      };
      const response = await axios.post(`${url}/user/register`, registerData);
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Success');
      expect(response.data.message).toBe(
        'You have been successfully registered',
      );
      expect(response.data.data).toBeDefined();
    } catch (error) {
      expect(error.response.status).toBe(409);
      expect(error.response.data).toEqual({
        status: 'Warning',
        message: 'You are already register',
      });
    }
  });
  test('POST /user/register for validation of users details', async () => {
    try {
      const registerData = {
        name: 'brijesh',
        email: 'brijesh@gmail',
        password: '1410',
        contact: 1234567890,
      };
      const response = await axios.post(`${url}/user/register`, registerData);
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Success');
      expect(response.data.message).toBe(
        'You have been successfully registered',
      );
      expect(response.data.data).toBeDefined();
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBeDefined();
    }
  });
});

describe('User login API test block', () => {
  test('POST /user/login for email and password both are correct', async () => {
    const loginData = {
      email: 'brijesh@gmail.com',
      password: '1410',
    };
    const response = await axios.post(`${url}/user/login`, loginData);
    userId = response.data.data._id;
    userToken = response.data.token;
    userName = response.data.data.name;
    saveUsersToken(userId, userToken, userName);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('You have been successfully logged in');
  });
  test('POST /user/login for email is invalid', async () => {
    try {
      const loginData = {
        email: 'brijesh123@gmail.com',
        password: '1410',
      };
      const response = await axios.post(`${url}/user/login`, loginData);
      expect(response.status).toBe(200);
      expect(response.data.message).toBe(
        'You have been successfully logged in',
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual({
        status: 'Error',
        message: 'Invalid email',
      });
    }
  });
  test('POST /user/login for password is invalid', async () => {
    try {
      const loginData = {
        email: 'brijesh@gmail.com',
        password: '141000',
      };
      const response = await axios.post(`${url}/user/login`, loginData);
      expect(response.status).toBe(200);
      expect(response.data.message).toBe(
        'You have been successfully logged in',
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual({
        status: 'Error',
        message: 'Invalid password',
      });
    }
  });
});

describe('User update its profile', () => {
  test('PUT /user/profile/:userId', async () => {
    const data = {
      profile: 'Private',
    };
    const response = await axios.put(`${url}/user/profile/${userId}`, data, {
      headers: {
        authorization: userToken,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe(
      'Your profile are successfully updated...!',
    );
  });
});
