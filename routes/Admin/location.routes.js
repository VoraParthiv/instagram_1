const express = require('express');
const { adminAuth } = require('../../Middleware/adminAuth');
const { userLocationPoint } = require('../../Controller/location.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/location:
 *      post:
 *          tags:
 *              - Location
 *          summary: Location add by Admin...!
 *          description: This is use location point add by admin API...!
 *          requestBody:
 *              description: Enter user Id and location point of user...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Location'
 *          responses:
 *              '200':
 *                  description: Location of user are add successfully...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Location'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/location', adminAuth, userLocationPoint);

/**
 * @swagger
 * components:
 *  schemas:
 *      Location:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *              longitude:
 *                  type: integer
 *              latitude:
 *                  type: integer
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
