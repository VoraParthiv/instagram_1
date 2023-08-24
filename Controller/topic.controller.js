const topicSchema = require('../Model/topicSchema');
const userInterestSchema = require('../Model/userInterestSchema');
const { topicAddByAdminValidation } = require('../utils/validation');

// Topic add by Admin
exports.topicAddByAdmin = async (req, res) => {
  try {
    const { error, value } = topicAddByAdminValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const data = await topicSchema.create(value);
    return res.status(200).json({
      status: 'Success',
      message: 'Topic are add successfully...!',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Topic View
exports.topicLists = async (req, res) => {
  try {
    const topicLists = await topicSchema.find();
    return res.status(200).json({
      status: 'Success',
      data: topicLists,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Topic select by User
exports.topicSelectUser = async (req, res) => {
  try {
    const newObj = {
      userId: req.userId,
      topicId: req.body.topicId,
    };
    await userInterestSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'Your topic are selected',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
