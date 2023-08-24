const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const {
  messageList,
  messageLikeByUser,
  messageLikeView,
} = require('../../Controller/message.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /chat/list:
 *      get:
 *          tags:
 *              - Message
 *          summary: List of message...!
 *          description: This is user message list API...!
 *          responses:
 *              '200':
 *                  description: Your message list...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/list', userAuth, messageList);

/**
 * @swagger
 * paths:
 *  /chat/like:
 *      put:
 *          tags:
 *              - Message
 *          summary: Like of message...!
 *          description: This is message like API...!
 *          requestBody:
 *              description: Enter message id and user id...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/messageLike'
 *          responses:
 *              '200':
 *                  description: Message like...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/messageLike'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.put('/like', userAuth, messageLikeByUser);

/**
 * @swagger
 * paths:
 *  /chat/like/view/{messageId}:
 *      get:
 *          tags:
 *              - Message
 *          summary: View like of message...!
 *          description: This is message like view API...!
 *          parameters:
 *              - in: path
 *                name: messageId
 *                description: Enter message id
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: The list of user of like message...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/like/view/:messageId', userAuth, messageLikeView);

/**
 * @swagger
 * components:
 *  schemas:
 *      messageLike:
 *          type: object
 *          properties:
 *              messageId:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
