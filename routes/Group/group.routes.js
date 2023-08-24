const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const {
  createGroupByUser,
  addUserIntoGroup,
  removeUserGroup,
  listUserGroup,
} = require('../../Controller/group.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /group/create:
 *      post:
 *          tags:
 *              - Group
 *          summary: Group Created...!
 *          description: This group created by user API...!
 *          requestBody:
 *              description: Object of group create...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Group'
 *          responses:
 *              '200':
 *                  description: Your group are created...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Group'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/create', userAuth, createGroupByUser);

/**
 * @swagger
 * paths:
 *  /group/add:
 *      post:
 *          tags:
 *              - Group
 *          summary: Add user into group...!
 *          description: This user add in group API...!
 *          requestBody:
 *              description: Enter group id and user id...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addUserGroup'
 *          responses:
 *              '200':
 *                  description: User are add into the group...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/addUserGroup'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/add', userAuth, addUserIntoGroup);

/**
 * @swagger
 * paths:
 *  /group/remove:
 *      put:
 *          tags:
 *              - Group
 *          summary: Remove user from group...!
 *          description: This user remove from the group API...!
 *          requestBody:
 *              description: Enter group id and user id...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addUserGroup'
 *          responses:
 *              '200':
 *                  description: User are remove from the group...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/addUserGroup'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.put('/remove', userAuth, removeUserGroup);

/**
 * @swagger
 * paths:
 *  /group/list/{groupId}:
 *      get:
 *          tags:
 *              - Group
 *          summary: List of user of the group...!
 *          description: This user list of group API...!
 *          parameters:
 *              - in: path
 *                name: groupId
 *                description: Enter group id.
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: User are remove from the group...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/list/:groupId', userAuth, listUserGroup);

/**
 * @swagger
 * components:
 *  schemas:
 *      Group:
 *          type: object
 *          properties:
 *              groupName:
 *                  type: string
 *              addUser:
 *                  type: array
 *                  items:
 *                      type: string
 *              groupImage:
 *                  type: string
 *      addUserGroup:
 *          type: object
 *          properties:
 *              groupId:
 *                  type: string
 *              userId:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
