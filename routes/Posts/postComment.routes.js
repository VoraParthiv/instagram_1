const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const {
  commentAddByUser,
  commentDelete,
  commentViewListOfPost,
} = require('../../Controller/comment.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /post/comment:
 *      post:
 *          tags:
 *              - PostComment
 *          summary: Comment on Posts...!
 *          description: User comment on post API...!
 *          requestBody:
 *              description: Object of comment for post...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PostComment'
 *          responses:
 *              '200':
 *                  description: Comment are post...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/PostComment'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/comment', userAuth, commentAddByUser);

/**
 * @swagger
 * paths:
 *  /post/comment/delete/{cId}:
 *      delete:
 *          tags:
 *              - PostComment
 *          summary: Remove comment on post...!
 *          description: This is remove comment on API...!
 *          parameters:
 *              - in: path
 *                name: cId
 *                description: Enter comment id for delete
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Comment are deleted...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/PostComment'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.delete('/comment/delete/:cId', userAuth, commentDelete);

/**
 * @swagger
 * paths:
 *  /post/comment/view/{postId}:
 *      get:
 *          tags:
 *              - PostComment
 *          summary: Comment view post...!
 *          description: This is comment view of specific API...!
 *          parameters:
 *              - in: path
 *                name: postId
 *                description: Enter comment id for delete
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: List of comment of post...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/comment/view/:postId', userAuth, commentViewListOfPost);

/**
 * @swagger
 * components:
 *  schemas:
 *      PostComment:
 *          type: object
 *          properties:
 *              postId:
 *                  type: string
 *              comment:
 *                  type: string
 *              commentByUserId:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
