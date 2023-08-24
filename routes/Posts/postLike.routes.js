const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');

const {
  likeByUser,
  viewLikeOnPost,
  removeLikeOnPost,
} = require('../../Controller/like.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /post/like:
 *      post:
 *          tags:
 *              - PostLike
 *          summary: Like on Posts...!
 *          description: User like on post API...!
 *          requestBody:
 *              description: Object of post id and user id which are like...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PostLike'
 *          responses:
 *              '200':
 *                  description: Like on post...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/PostLike'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/like', userAuth, likeByUser);

/**
 * @swagger
 * paths:
 *  /post/like/view/{postId}:
 *      get:
 *          tags:
 *              - PostLike
 *          summary: View likes on posts...!
 *          description: This like view of posts API...!
 *          parameters:
 *              - in: path
 *                name: cId
 *                description: Enter comment id for delete
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: View like on post...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/like/view/:postId', userAuth, viewLikeOnPost);

/**
 * @swagger
 * paths:
 *  /post/like/remove/{postId}:
 *      delete:
 *          tags:
 *              - PostLike
 *          summary: Like remove on posts...!
 *          description: This like remove of posts API...!
 *          parameters:
 *              - in: path
 *                name: postId
 *                description: Enter comment id for delete
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Like remove on post...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.delete('/like/remove/:postId', userAuth, removeLikeOnPost);

/**
 * @swagger
 * components:
 *  schemas:
 *      PostLike:
 *          type: object
 *          properties:
 *              postId:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
