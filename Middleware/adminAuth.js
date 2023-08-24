const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const adminSchema = require('../Model/adminSchema');

exports.adminAuth = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.TOKEN_KEY, async (error, payload) => {
    if (error) {
      return res.status(500).json({
        status: 'Error',
        message: 'Your token is invalid',
      });
    }
    const adminExist = await adminSchema.find({
      _id: { $eq: new mongoose.Types.ObjectId(payload.adminId) },
    });
    if (adminExist.length === 0) {
      return res.status(401).json({
        status: 'Error',
        message: 'Unauthorized',
      });
    }
    next();
    return payload.adminId;
  });
};
