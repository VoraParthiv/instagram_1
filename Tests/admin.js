/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const axios = require('axios');
require('dotenv').config();
const { url, saveUsersToken } = require('../apiUrl');

describe('Admin register API test block', () => {
  test('POST /admin/register admin register', async () => {
    const registerData = {
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
    };
    const res = await axios.post(`${url}/admin/register`, registerData);
    expect(res.status).toBe(200);
    expect(res.data.message).toBe('You are successfully register');
  });
  test('POST /admin/register admin register with validation', async () => {
    try {
      const registerData = {
        name: '',
        email: 'admin@gmail.com',
        password: 'admin',
      };
      const res = await axios.post(`${url}/admin/register`, registerData);
      expect(res.status).toBe(200);
      expect(res.data.message).toBe('You are successfully register');
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Error');
      expect(error.response.data.message).toBeDefined();
    }
  });
});

describe('Admin login API test block', () => {
  test('POST /admin/login for email and password both are valid', async () => {
    const loginData = {
      email: 'admin@gmail.com',
      password: 'admin',
    };
    const response = await axios.post(`${url}/admin/login`, loginData);
    adminToken = response.data.token;
    adminId = response.data.data._id;
    saveUsersToken(adminId, adminToken, 'admin');
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('You have been successfully logged in');
  });
  test('POST /admin/login for email is invalid', async () => {
    try {
      const loginData = {
        email: 'admin123@gmail.com',
        password: 'admin',
      };
      const response = await axios.post(`${url}/admin/login`, loginData);
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
  test('POST /admin/login for password is invalid', async () => {
    try {
      const loginData = {
        email: 'admin@gmail.com',
        password: 'admin123',
      };
      const response = await axios.post(`${url}/admin/login`, loginData);
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
