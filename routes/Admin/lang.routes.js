const express = require('express');
const { adminAuth } = require('../../Middleware/adminAuth');
const {
  languageAddByAdmin,
} = require('../../Controller/lang.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/language:
 *      post:
 *          tags:
 *              - Language
 *          summary: Language add by Admin...!
 *          description: This language add by admin API...!
 *          requestBody:
 *              description: Enter language name...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Language'
 *          responses:
 *              '200':
 *                  description: Language are add successfully...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Language'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/language', adminAuth, languageAddByAdmin);

/**
 * @swagger
 * components:
 *  schemas:
 *      Language:
 *          type: object
 *          properties:
 *              languageName:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
