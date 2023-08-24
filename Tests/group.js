/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { url, getToken } = require('../apiUrl');

let groupId = null;
describe('This is group testing group', () => {
  const name = 'brijesh';
  test('POST /group/create for create group and add users into the group', async () => {
    const userResult = getToken(name);
    const data = {
      groupName: 'abcd',
      addUser: ['6482fbc361df8b955409949c', '6482fd501dc491ddda9bfcbd'],
      groupImage:
        'data:image/png;base64,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',
    };
    const response = await axios.post(`${url}/group/create`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    groupId = response.data.data._id;
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Group are created....!');
  });
  test('POST /group/create for choose another format image for group image support(jpeg, png, or jpg)', async () => {
    try {
      const userResult = getToken(name);
      const data = {
        groupName: 'abcd',
        addUser: ['6482fbc361df8b955409949c', '6482fd501dc491ddda9bfcbd'],
        groupImage:
          'data:image/gif;base64,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',
      };
      const response = await axios.post(`${url}/group/create`, data, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Group are created....!');
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Error');
      expect(error.response.data.message).toBe(
        'Only allow jpeg, png, or jpg format images for upload post',
      );
    }
  });
  test('POST /group/add for add users into group by only Group Admin', async () => {
    const userResult = getToken(name);
    const data = {
      userId: '648317f20412d5cfc9e0f881',
      groupId,
    };
    const response = await axios.post(`${url}/group/add`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('status', 'Success');
    expect(response.data).toHaveProperty(
      'message',
      'User are add into group....!',
    );
  });
  test('POST /group/add for other group user attempt to add any user', async () => {
    const userResult = getToken(name);
    try {
      const data = {
        userId: '648317f20412d5cfc9e0f881',
        groupId,
      };
      const response = await axios.post(`${url}/group/add`, data, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('status', 'Success');
      expect(response.data).toHaveProperty(
        'message',
        'User are add into group....!',
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual({
        status: 'Warning',
        message: 'Only admin can add user into the group',
      });
    }
  });
  test('GET /group/list/{groupId} for lists of user of the group', async () => {
    const userResult = getToken(name);
    const response = await axios.get(`${url}/group/list/${groupId}`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data).toBeDefined();
  });
  test('PUT /group/remove for remove user from the group by only Group Admin', async () => {
    const userResult = getToken(name);
    const data = {
      groupId,
      userId: '648317f20412d5cfc9e0f881',
    };
    const response = await axios.put(`${url}/group/remove`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('User are remove from the group');
  });
  test('PUT /group/remove for remove user from the group by any group user', async () => {
    const userResult = getToken(name);
    try {
      const data = {
        groupId,
        userId: '648317f20412d5cfc9e0f881',
      };
      const response = await axios.put(`${url}/group/remove`, data, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('User are remove from the group');
    } catch (error) {
      expect(error.response.status).toBe(403);
      expect(error.response.data).toEqual({
        status: 'Warning',
        message: 'Only admin can remove user from the group',
      });
    }
  });
});