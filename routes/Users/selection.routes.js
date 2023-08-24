const express = require('express');
const {
  topicLists,
  topicSelectUser,
} = require('../../Controller/topic.controller');
const {
  languageSelectUser,
  languageLists,
} = require('../../Controller/lang.controller');
const { userAuth } = require('../../Middleware/userAuth');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /user/topic/list:
 *      get:
 *          tags:
 *              - Topic
 *          summary: Topic list for User...!
 *          description: This topic list API...!
 *          responses:
 *              '200':
 *                  description: Topic list...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Topic'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/topic/list', userAuth, topicLists);

/**
 * @swagger
 * paths:
 *  /user/topic/select:
 *      post:
 *          tags:
 *              - Topic
 *          summary: Topic select by User...!
 *          description: This topic select by user from topic lists API...!
 *          requestBody:
 *              description: Enter topic id and user id...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TopicSelect'
 *          responses:
 *              '200':
 *                  description: Topic list...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/TopicSelect'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/topic/select', userAuth, topicSelectUser);

/**
 * @swagger
 * paths:
 *  /user/language/list:
 *      get:
 *          tags:
 *              - Language
 *          summary: Language list...!
 *          description: This language list API...!
 *          responses:
 *              '200':
 *                  description: Language list...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Language'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.get('/language/list', userAuth, languageLists);

/**
 * @swagger
 * paths:
 *  /user/language/select:
 *      post:
 *          tags:
 *              - Language
 *          summary: Language select by User...!
 *          description: This language select by user from topic lists API...!
 *          requestBody:
 *              description: Enter language id and user id...!
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LanguageSelect'
 *          responses:
 *              '200':
 *                  description: Language selected...!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/LanguageSelect'
 *              '500':
 *                  description: There are some issues...!
 *          security:
 *              - authorization: []
 */
router.post('/language/select', userAuth, languageSelectUser);

/**
 * @swagger
 * components:
 *  schemas:
 *      Topic:
 *          type: object
 *          properties:
 *              topicName:
 *                  type: string
 *      TopicSelect:
 *          type: object
 *          properties:
 *              topicId:
 *                  type: string
 *      LanguageSelect:
 *          type: object
 *          properties:
 *              langId:
 *                  type: string
 *  securitySchemes:
 *      authorization:
 *          type: apiKey
 *          name: authorization
 *          in: header
 */

module.exports = router;
