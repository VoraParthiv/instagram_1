const express = require('express');
const { userAuth } = require('../../Middleware/userAuth');
const {
  viewAnyUserProfile,
  searchUserList,
  followUser,
  followUserView,
  requestViewByUser,
  requestAcceptedByUser,
  requestRejectedByUser,
} = require('../../Controller/profile.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /profile/view/{userId}:
 *      get:
 *          tags:
 *              - Profile
 *          summary: View user profile...!
 *          description: This is view any user profile API.
 *          parameters:
 *              - name: userId
 *                in: path
 *                description: Enter user id.
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Your profile are successfully updated...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/view/:userId', userAuth, viewAnyUserProfile);

/**
 * @swagger
 * paths:
 *  /profile/search:
 *      post:
 *          tags:
 *              - Profile
 *          summary: Search user...!
 *          description: This is user search list API...!
 *          requestBody:
 *              description: Enter user name.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Search'
 *          responses:
 *              '200':
 *                  description: Your search user list...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/search', userAuth, searchUserList);

/**
 * @swagger
 * paths:
 *  /profile/follow:
 *      post:
 *          tags:
 *              - Profile
 *          summary: Follow...!
 *          description: This user follow API...!
 *          requestBody:
 *              description: Enter following user id...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Follow'
 *          responses:
 *              '200':
 *                  description: You are following to user...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Follow'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/follow', userAuth, followUser);

/**
 * @swagger
 * paths:
 *  /profile/follow/view:
 *      post:
 *          tags:
 *              - Profile
 *          summary: Followers & Following view...!
 *          description: This user followers and following view follow API...!
 *          requestBody:
 *              description: Enter label for view followers or following...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/FollowView'
 *          responses:
 *              '200':
 *                  description: List of followers or following...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/FollowView'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/follow/view', userAuth, followUserView);

/**
 * @swagger
 * paths:
 *  /profile/request:
 *      get:
 *          tags:
 *              - Profile
 *          summary: Follow request view...!
 *          description: This follow request view by user API...!
 *          responses:
 *              '200':
 *                  description: Request list...!
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/request', userAuth, requestViewByUser);

/**
 * @swagger
 * paths:
 *  /profile/request/accepted:
 *      post:
 *          tags:
 *              - Profile
 *          summary: Follow request accept...!
 *          description: This user follow request accept API...!
 *          requestBody:
 *              description: Enter request id...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Request'
 *          responses:
 *              '200':
 *                  description: Request accept...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Request'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/request/accepted', userAuth, requestRejectedByUser);

/**
 * @swagger
 * paths:
 *  /profile/request/rejected:
 *      post:
 *          tags:
 *              - Profile
 *          summary: Follow request rejected...!
 *          description: This user follow request rejected API...!
 *          requestBody:
 *              description: Enter request id...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Request'
 *          responses:
 *              '200':
 *                  description: Request rejected...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Request'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/request/rejected', userAuth, requestAcceptedByUser);

/**
 * @swagger
 * components:
 *  schemas:
 *      Search:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *      Follow:
 *          type: object
 *          properties:
 *              followingUserId:
 *                  type: string
 *      FollowView:
 *          type: object
 *          properties:
 *              label:
 *                  type: string
 *      Request:
 *          type: object
 *          properties:
 *              followingUserId:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
