/* eslint-disable no-undef */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { url, getToken } = require('../apiUrl');

describe('This is view and search any other user profile', () => {
  const name = 'brijesh';
  test('GET /profile/view/:userId for view any user profile using profile id', async () => {
    try {
      const userResult = getToken(name);
      const userId = '6482fbc361df8b955409949c';
      const response = await axios.get(`${url}/profile/view/${userId}`, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Success');
      expect(response.data.data).not.toBeUndefined();
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Warning');
      expect(error.response.data.message).toBe('User not found');
    }
  });
  test('POST /profile/search for search any user profile', async () => {
    try {
      const userResult = getToken(name);
      const data = {
        name: 'oM PATel',
      };
      const response = await axios.post(`${url}/profile/search`, data, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Success');
      expect(response.data.data).toBeDefined();
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Warning');
      expect(error.response.data.message).toBe('User not found');
    }
  });
  // test('POST /profile/search for search any user profile if user is not exist', async () => {
  //   try {
  //     const userResult = getToken(name);
  //     const data = {
  //       name: 'oM PATel abc',
  //     };
  //     const response = await axios.post(`${url}/profile/search`, data, {
  //       headers: {
  //         authorization: userResult.token,
  //       },
  //     });
  //     expect(response.status).toBe(200);
  //     expect(response.data.status).toBe('Success');
  //     expect(response.data.data).toBeDefined();
  //   } catch (error) {
  //     expect(error.response.status).toBe(400);
  //     expect(error.response.data.status).toBe('Warning');
  //     expect(error.response.data.message).toBe('User not found');
  //   }
  // });
});

describe('This is  user followers, following and request block', () => {
  const name = 'brijesh';
  test('POST /profile/follow for user account are public', async () => {
    const userResult = getToken(name);
    const data = {
      // followingUserId: '6482fd28f0660752c5bf1e5a',
      followingUserId: userResult.id,
    };
    const response = await axios.post(`${url}/profile/follow`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });
  test('POST /profile/follow for user account are private', async () => {
    const userResult = getToken(name);
    const data = {
      // followingUserId: '6482fd28f0660752c5bf1e5a',
      followingUserId: userResult.id,
    };
    const response = await axios.post(`${url}/profile/follow`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });
  test('GET /profile/request for view all follow request', async () => {
    const userResult = getToken(name);
    const response = await axios.get(`${url}/profile/request`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data).toBeDefined();
  });
  test('POST /profile/request/accepted for accepted user follow request', async () => {
    const userResult = getToken(name);
    const data = {
      followingUserId: '6482fd28f0660752c5bf1e5a',
    };
    const response = await axios.post(`${url}/profile/request/accepted`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Request accepted');
  });
  test('POST /profile/follow/view for view followers of users', async () => {
    const userResult = getToken(name);
    const data = {
      label: 'Followers',
    };
    const response = await axios.post(`${url}/profile/follow/view`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data).toBeDefined();
  });
  test('POST /profile/follow/view for view following of users', async () => {
    const userResult = getToken(name);
    const data = {
      label: 'Following',
    };
    const response = await axios.post(`${url}/profile/follow/view`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data).toBeDefined();
  });
});
