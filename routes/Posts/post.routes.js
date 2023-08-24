const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const {
  postAddByUser,
  allPostViewByUser,
  postViewByPostId,
  deletePostByPostId,
  postAddByUserBase64,
} = require('../../Controller/post.controller');
const upload = require('../../Middleware/userPost');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /post/upload:
 *      post:
 *          tags:
 *              - PostByUser
 *          summary: User Post Add...!
 *          description: This is user post upload API...!
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          responses:
 *              '200':
 *                  description: Your post are successfully add...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/upload', upload.single('image'), userAuth, postAddByUser);

/**
 * @swagger
 * paths:
 *  /post/view:
 *      get:
 *          tags:
 *              - PostByUser
 *          summary: User Post Lists...!
 *          description: This is user post list API...!
 *          responses:
 *              '200':
 *                  description: Your post lists...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Post'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/view', userAuth, allPostViewByUser);

/**
 * @swagger
 * paths:
 *  /post/view/{postId}:
 *      get:
 *          tags:
 *              - PostByUser
 *          summary: View single post...!
 *          description: This is single post view using post id API...!
 *          parameters:
 *              - in: path
 *                name: postId
 *                description: Enter your post id.
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Your selected post...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/view/:postId', userAuth, postViewByPostId);

/**
 * @swagger
 * paths:
 *  /post/delete/{postId}:
 *      delete:
 *          tags:
 *              - PostByUser
 *          summary: Delete post by user...!
 *          description: This is delete post using post id API...!
 *          parameters:
 *              - in: path
 *                name: postId
 *                description: Enter your post id.
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Your post are deleted...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.delete('/delete/:postId', userAuth, deletePostByPostId);

/**
 * @swagger
 * paths:
 *  /post/upload2:
 *      post:
 *          tags:
 *              - PostByUser
 *          summary: User Post Add...!
 *          description: This is user post upload API...!
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/postBase64'
 *          responses:
 *              '200':
 *                  description: Your post are successfully add...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/postBase64'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/upload2', userAuth, postAddByUserBase64);

/**
 * @swagger
 * components:
 *  schemas:
 *      Post:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *              image:
 *                  type: string
 *                  format: binary
 *              description:
 *                  type: string
 *      postBase64:
 *          type: object
 *          properties:
 *              description:
 *                  type: string
 *              postImage:
 *                  type: string
 *                  format: base64
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
