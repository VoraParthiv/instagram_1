const express = require('express');
const {
  userRegister,
  userLogin,
  userProfileUpdate,
  tokenVerify,
} = require('../../Controller/user.controller');
const { userAuth } = require('../../Middleware/userAuth');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /user/register:
 *      post:
 *          tags:
 *              - User
 *          summary: User Register...!
 *          description: This is user register API.
 *          requestBody:
 *              description: User register object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserRegister'
 *          responses:
 *              '200':
 *                  description: You are register...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserRegister'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/register', userRegister);

/**
 * @swagger
 * paths:
 *  /user/login:
 *      post:
 *          tags:
 *              - User
 *          summary: User Login...!
 *          description: This is user login API.
 *          requestBody:
 *              description: Enter email and password.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserLogin'
 *          responses:
 *              '200':
 *                  description: You are login...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserLogin'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/login', userLogin);

/**
 * @swagger
 * paths:
 *  /user/profile/{userId}:
 *      put:
 *          tags:
 *              - User
 *          summary: User Profile Update...!
 *          description: This is user profile update API.
 *          parameters:
 *              - name: userId
 *                in: path
 *                description: Enter user id.
 *                schema:
 *                  type: string
 *          requestBody:
 *              description: New user information object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserRegister'
 *          responses:
 *              '200':
 *                  description: Your profile are successfully updated...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserRegister'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.put('/profile/:userId', userAuth, userProfileUpdate);

router.post('/token', userAuth, tokenVerify);

/**
 * @swagger
 * components:
 *  schemas:
 *      UserRegister:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              contact:
 *                  type: integer
 *      UserLogin:
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
