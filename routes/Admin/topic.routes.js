const express = require('express');
const { adminAuth } = require('../../Middleware/adminAuth');
const { topicAddByAdmin } = require('../../Controller/topic.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/topic:
 *      post:
 *          tags:
 *              - Topic
 *          summary: Topic add by Admin...!
 *          description: This topic add by admin API...!
 *          requestBody:
 *              description: Enter topic name...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Topic'
 *          responses:
 *              '200':
 *                  description: Topic are add successfully...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Topic'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/topic', adminAuth, topicAddByAdmin);

/**
 * @swagger
 * components:
 *  schemas:
 *      Topic:
 *          type: object
 *          properties:
 *              topicName:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
