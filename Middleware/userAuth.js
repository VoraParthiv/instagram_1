/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const userSchema = require('../Model/userSchema');

exports.userAuth = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('🚀 ~ file: userAuth.js:8 ~ token:', token);
  jwt.verify(token, process.env.TOKEN_KEY, async (error, payload) => {
    if (error) {
      return res.status(500).json({
        status: 'Error',
        message: 'JWT must be provided. Otherwise you cannot access',
      });
    }
    const userExist = await userSchema.find({
      _id: { $eq: new mongoose.Types.ObjectId(payload.userId) },
    });
    if (userExist.length === 0) {
      return res.status(401).json({
        status: 'Error',
        message: 'Unauthorized',
      });
    }
    req.userId = payload.userId;
    next();
    // return true;
  });
};
