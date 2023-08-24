/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { url, getToken, getSavePostIds } = require('../apiUrl');

describe('This is user post like block', () => {
  const name = 'brijesh';
  test('POST /post/like for user add like on post', async () => {
    const userResult = getToken(name);
    const postResult = getSavePostIds();
    const data = {
      postId: postResult[0].postId,
    };
    const response = await axios.post(`${url}/post/like`, data, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      status: 'Success',
      message: 'like add...!',
    });
  });
  test('GET /post/like/view/{postId} for view likes on post', async () => {
    const userResult = getToken(name);
    const postResult = getSavePostIds();
    const { postId } = postResult[0];
    const response = await axios.get(`${url}/post/like/view/${postId}`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.likeData).toBeDefined();
  });
  test('DELETE /post/like/remove/{postId} for remove like on post by user', async () => {
    const userResult = getToken(name);
    const postResult = getSavePostIds();
    const { postId } = postResult[0];
    const response = await axios.delete(`${url}/post/like/remove/${postId}`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Like remove');
  });
});
