/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { url, getToken, getSavePostIds } = require('../apiUrl');

let cId = null;
describe('This user post comment API test block', () => {
  const name = 'brijesh';
  test('POST /post/comment for post comment on users post', async () => {
    const userResult = getToken(name);
    const postResult = getSavePostIds();
    const commentData = {
      commentByUserId: userResult.id,
      postId: postResult[0].postId,
      comment: 'good post',
    };
    const response = await axios.post(`${url}/post/comment`, commentData, {
      headers: {
        authorization: userResult.token,
      },
    });
    cId = response.data.data._id;
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Success');
    expect(response.data.message).toBe('Comment are post...!');
    expect(response.data.data).toBeDefined();
  });
  test('POST /post/comment for validation into users comments', async () => {
    try {
      const userResult = getToken(name);
      const postResult = getSavePostIds();
      const commentData = {
        commentByUserId: userResult.id,
        postId: postResult[0].postId,
        comment: 'good postqqqqqqqqqqqqqqqqqqqqqqqqqassssssssssssssssssssssssq',
      };
      const response = await axios.post(`${url}/post/comment`, commentData, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Success');
      expect(response.data.message).toBe('Comment are post...!');
      expect(response.data.data).toBeDefined();
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.status).toBe('Error');
      expect(error.response.data.message).toBeDefined();
    }
  });
  test('GET /post/comment/view/{postId}', async () => {
    const userResult = getToken(name);
    const postResult = getSavePostIds();
    const { postId } = postResult[0];
    const response = await axios.get(`${url}/post/comment/view/${postId}`, {
      headers: {
        authorization: userResult.token,
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.data).toBeDefined();
  });
  test('DELETE /post/comment/delete/{cId} only delete comment by post owner', async () => {
    try {
      const userResult = getToken(name);
      const response = await axios.delete(`${url}/post/comment/delete/${cId}`, {
        headers: {
          authorization: userResult.token,
        },
      });
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Success');
      expect(response.data.message).toBe('Comment are deleted');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        status: 'Warning',
        message: 'You can not deleted this comment',
      });
    }
  });
});
