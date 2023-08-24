/* eslint-disable newline-per-chained-call */
const joi = require('joi');

// User Register Validation
exports.registerValidation = joi.object({
  name: joi.string().alphanum().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().alphanum().min(3).max(5).required(),
  contact: joi.number().integer().optional(),
});

// Admin Validation
exports.adminValidation = joi.object({
  name: joi.string().alphanum().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(3).max(5).required(),
});

// User or Admin Login Validation
exports.loginValidation = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().alphanum().required(),
});

// Post Validation
exports.postValidation = joi.object({
  postImage: joi.string().required(),
  description: joi.string().min(5).max(20).optional(),
});

// Post Like Validation
exports.postLikeValidation = joi.object({
  postId: joi.string().required(),
});

// Post Comment Validation
exports.postCommentValidation = joi.object({
  postId: joi.string().required(),
  comment: joi.string().min(5).max(15).required(),
  commentByUserId: joi.string().required(),
});

// Block User Validation
exports.blockUserValidation = joi.object({
  blockUserId: joi.string().required(),
});

// Group Validation
exports.groupValidation = joi.object({
  groupName: joi.string().min(3).max(10).required(),
  addUser: joi.array().required(),
  groupImage: joi.string().optional(),
});

// User Searching Validation
exports.userSearchValidation = joi.object({
  name: joi.string().required(),
});

// Follow User Validation
exports.userFollowValidation = joi.object({
  followingUserId: joi.string().alphanum().required(),
});
exports.userFollowViewValidation = joi.object({
  label: joi.string().required(),
});
exports.followRequestValidation = joi.object({
  followingUserId: joi.string().alphanum().required(),
});

// Report Validation
exports.userReportValidation = joi.object({
  postId: joi.string().alphanum().optional(),
  profileId: joi.string().alphanum().optional(),
  reason: joi.string().min(8).max(20).required(),
});

// Save Post Validation
exports.savePostValidation = joi.object({
  postId: joi.string().required(),
});

// Language add by Admin Validation
exports.langAddByAdminValidation = joi.object({
  languageName: joi.string().required(),
});

// Topics add by Admin Validation
exports.topicAddByAdminValidation = joi.object({
  topicName: joi.string().required(),
});

// Location add by Admin Validation
exports.locationAddByAdminValidation = joi.object({
  userId: joi.string().required(),
  longitude: joi.number().required(),
  latitude: joi.number().required(),
});
