/* eslint-disable no-undef */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { url, getToken, getSavePostIds } = require('../apiUrl');

const name = 'brijesh';
describe('This is save posts of user into collection block', () => {
  test('POST /action/save for user save any post in its collection (postId required)', async () => {
    const userResult = getToken(name);
    const postResult = getSavePostIds();
    const data = {
      postId: postResult[0].postId,
    };
    const response = await axios.post(`${url}/action/save`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Post are save in collection');
  });
  test('POST /action/save for user save any post in its collection (postId not required)', async () => {
    const userResult = getToken(name);
    try {
      const data = {
        postId: '',
      };
      const response = await axios.post(`${url}/action/save`, data, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Post are save in collection');
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Error');
      expect(error.response.data.message).toBeDefined();
    }
  });
  test('GET /action/save/list for user view all save post from its collection', async () => {
    const userResult = getToken(name);
    const response = await axios.get(`${url}/action/save/list`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data).toBeTruthy();
  });
  test('GET /action/save/list for if no post are available into user collection', async () => {
    try {
      const userResult = getToken(name);
      const response = await axios.get(`${url}/action/save/list`, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.data).toBeDefined();
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Warning');
      expect(error.response.data.message).toBe(
        'No post available in your collection',
      );
    }
  });
  test('DELETE /action/save for remove post from user collection', async () => {
    const userResult = getToken(name);
    const postResult = getSavePostIds();
    const { postId } = postResult[0];
    const response = await axios.delete(`${url}/action/save/${postId}`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Post are remove from your collection');
  });
});

describe('This is user blocking into block lists block', () => {
  test('POST /action/block for block user into block list', async () => {
    const userResult = getToken(name);
    const data = {
      blockUserId: '6482fd28f0660752c5bf1e5a',
    };
    const response = await axios.post(`${url}/action/block`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      status: 'Success',
      message: 'User are block',
    });
  });
  test('POST /action/block for block user into block list if block userId not exist', async () => {
    try {
      const userResult = getToken(name);
      const data = {
        blockUserId: '',
      };
      const response = await axios.post(`${url}/action/block`, data, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        status: 'Success',
        message: 'User are block',
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Error');
      expect(error.response.data.message).toBeDefined();
    }
  });
  test('GET /action/block/list for view block list', async () => {
    const userResult = getToken(name);
    const response = await axios.get(`${url}/action/block/list`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data[0]).toHaveProperty('userId');
    expect(response.data.data[0]).toHaveProperty('blockUserId');
  });
  test('DELETE /action/block/:blockUserId for remove user from block', async () => {
    const userResult = getToken(name);
    const blockUserId = '6482fd28f0660752c5bf1e5a';
    const response = await axios.delete(`${url}/action/block/${blockUserId}`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('User are unblock');
  });
});

describe('This is user report in post or another user profile block', () => {
  test('POST /action/report for report by User on any post', async () => {
    const userResult = getToken(name);
    const postResult = getSavePostIds();
    const data = {
      postId: postResult[0].postId,
      reason: 'Bad post',
    };
    const response = await axios.post(`${url}/action/report`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Report are success');
  });
  test('POST /action/report for report by User on any profile of user', async () => {
    const userResult = getToken(name);
    const data = {
      profileId: '6482fd28f0660752c5bf1e5a',
      reason: 'This profile is fake',
    };
    const response = await axios.post(`${url}/action/report`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Report are success');
  });
  test('POST /action/report for validation when user report', async () => {
    try {
      const userResult = getToken(name);
      const data = {
        profileId: '6482fd28f0660752c5bf1e5a',
        reason: 'This profile is fakeasssssssssssssasasaaaaaaaaaaaaaa',
      };
      const response = await axios.post(`${url}/action/report`, data, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Report are success');
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBeDefined();
    }
  });
  test('POST /action/report/list for view list of post reports', async () => {
    const userResult = getToken('admin');
    const data = {
      label: 'Post',
    };
    const response = await axios.post(`${url}/action/report/list`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Success');
    expect(response.data.data).toBeTruthy();
  });
  test('POST /action/report/list for view list of profile report', async () => {
    try {
      const userResult = getToken('admin');
      const data = {
        label: 'Profile',
      };
      const response = await axios.post(`${url}/action/report/list`, data, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Success');
      expect(response.data.data).toBeTruthy();
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Error');
      expect(error.response.data.message).toBe('No reports are available');
    }
  });
});
