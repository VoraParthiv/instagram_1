const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const {
  blockByUser,
  removeBlockByUser,
  viewBlockUserList,
} = require('../../Controller/block.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /action/block:
 *      post:
 *          tags:
 *              - Block
 *          summary: Block User...!
 *          description: This is user block API.
 *          requestBody:
 *              description: Object of user block user schema.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userBlock'
 *          responses:
 *              '200':
 *                  description: User are block...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/userBlock'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/block', userAuth, blockByUser);

/**
 * @swagger
 * paths:
 *  /action/block/{blockUserId}:
 *      delete:
 *          tags:
 *              - Block
 *          summary: User block remove...!
 *          description: This is user remove from block list API.
 *          parameters:
 *              - in: path
 *                name: blockUserId
 *                description: Enter block user id.
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: User are unblock...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.delete('/block/:blockUserId', userAuth, removeBlockByUser);

/**
 * @swagger
 * paths:
 *  /action/block/list:
 *      get:
 *          tags:
 *              - Block
 *          summary: View block user list...!
 *          description: This is block list of user API.
 *          responses:
 *              '200':
 *                  description: Your block list...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/block/list', userAuth, viewBlockUserList);

/**
 * @swagger
 * components:
 *  schemas:
 *      userBlock:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *              blockUserId:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
