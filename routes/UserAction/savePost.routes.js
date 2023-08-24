const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const {
  postSaveByUser,
  removePostByUser,
  viewSavePostList,
} = require('../../Controller/save.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /action/save:
 *      post:
 *          tags:
 *              - SavePost
 *          summary: Save post...!
 *          description: This is user post save API.
 *          requestBody:
 *              description: Object of user post save.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/savePost'
 *          responses:
 *              '200':
 *                  description: Your post are save...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/savePost'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/save', userAuth, postSaveByUser);

/**
 * @swagger
 * paths:
 *  /action/save/{postId}:
 *      delete:
 *          tags:
 *              - SavePost
 *          summary: Remove post from the collection...!
 *          description: This is remove post collection from the user API.
 *          parameters:
 *              - in: path
 *                name: postId
 *                description: Enter post id.
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Post are remove...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.delete('/save/:postId', userAuth, removePostByUser);

/**
 * @swagger
 * paths:
 *  /action/save/list:
 *      get:
 *          tags:
 *              - SavePost
 *          summary: View save post list...!
 *          description: This is view save post list from the collection API.
 *          responses:
 *              '200':
 *                  description: Your save post list...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/save/list', userAuth, viewSavePostList);

/**
 * @swagger
 * components:
 *  schemas:
 *      savePost:
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
