const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const {
  reportByUser,
  reportViewByAdmin,
} = require('../../Controller/report.controller');
const { adminAuth } = require('../../Middleware/adminAuth');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /action/report:
 *      post:
 *          tags:
 *              - Report
 *          summary: Report by User...!
 *          description: This is user report API.
 *          requestBody:
 *              description: Object of report.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Report'
 *          responses:
 *              '200':
 *                  description: Your report are send...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Report'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/report', userAuth, reportByUser);

/**
 * @swagger
 * paths:
 *  /action/report/list:
 *      post:
 *          tags:
 *              - Report
 *          summary: Report list...!
 *          description: This is user report list view by Admin API.
 *          requestBody:
 *              description: Enter report label.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ReportList'
 *          responses:
 *              '200':
 *                  description: Your report list...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ReportList'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/report/list', adminAuth, reportViewByAdmin);

/**
 * @swagger
 * components:
 *  schemas:
 *      Report:
 *          type: object
 *          properties:
 *              postId:
 *                  type: string
 *              profileId:
 *                  type: string
 *              reason:
 *                  type: string
 *      ReportList:
 *          type: object
 *          properties:
 *              label:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
