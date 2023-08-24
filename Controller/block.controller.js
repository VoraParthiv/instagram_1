const { default: mongoose } = require('mongoose');
const blockSchema = require('../Model/blockSchema');
const { blockUserValidation } = require('../utils/validation');

// Block user
exports.blockByUser = async (req, res) => {
  try {
    const { error, value } = blockUserValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const newObj = {
      userId: req.userId,
      blockUserId: value.blockUserId,
    };
    await blockSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'User are block',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Remove Block user
exports.removeBlockByUser = async (req, res) => {
  const { blockUserId } = req.params;
  try {
    await blockSchema.deleteOne({
      $and: [
        { userId: { $eq: new mongoose.Types.ObjectId(req.userId) } },
        { blockUserId: { $eq: new mongoose.Types.ObjectId(blockUserId) } },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      message: 'User are unblock',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Block user list
exports.viewBlockUserList = async (req, res) => {
  try {
    const blockUserList = await blockSchema.find({
      userId: { $eq: new mongoose.Types.ObjectId(req.userId) },
    });
    if (blockUserList.length === 0) {
      return res.status(200).json({
        status: 'Success',
        message: 'No user in your block list',
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: blockUserList,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
