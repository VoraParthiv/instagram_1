const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const { findSimilarlyUser } = require('../../Controller/similarly.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /action/similarly:
 *      get:
 *          tags:
 *              - Similarly
 *          summary: Similarly find user...!
 *          description: This is find similarly user API.
 *          responses:
 *              '200':
 *                  description: List of similarly user...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Similarly'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/similarly', userAuth, findSimilarlyUser);

/**
 * @swagger
 * components:
 *  schemas:
 *      Similarly:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
