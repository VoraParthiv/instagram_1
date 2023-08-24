const express = require('express');
const {
  adminRegister,
  adminLogin,
} = require('../../Controller/admin.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/register:
 *      post:
 *          tags:
 *              - Admin
 *          summary: Admin Register...!
 *          description: This is admin register API.
 *          requestBody:
 *              description: Admin register object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AdminRegister'
 *          responses:
 *              '200':
 *                  description: You are register...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/AdminRegister'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/register', adminRegister);

/**
 * @swagger
 * paths:
 *  /admin/login:
 *      post:
 *          tags:
 *              - Admin
 *          summary: Admin Login...!
 *          description: This is admin login API.
 *          requestBody:
 *              description: Enter email and password.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AdminLogin'
 *          responses:
 *              '200':
 *                  description: You are login...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/AdminLogin'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/login', adminLogin);

/**
 * @swagger
 * components:
 *  schemas:
 *      AdminRegister:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *      AdminLogin:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
