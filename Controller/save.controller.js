const { default: mongoose } = require('mongoose');
const saveSchema = require('../Model/saveSchema');
const { savePostValidation } = require('../utils/validation');

// Block user
exports.postSaveByUser = async (req, res) => {
  try {
    const { error, value } = savePostValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const newObj = {
      userId: req.userId,
      postId: value.postId,
    };
    await saveSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'Post are save in collection',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Remove post from user collection
exports.removePostByUser = async (req, res) => {
  const { postId } = req.params;
  try {
    await saveSchema.deleteOne({
      $and: [
        { userId: { $eq: new mongoose.Types.ObjectId(req.userId) } },
        { postId: { $eq: new mongoose.Types.ObjectId(postId) } },
      ],
    });
    return res.status(200).json({
      status: 'Success',
      message: 'Post are remove from your collection',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Block user list
exports.viewSavePostList = async (req, res) => {
  try {
    const savePostList = await saveSchema.find({
      userId: { $eq: new mongoose.Types.ObjectId(req.userId) },
    });
    if (savePostList.length === 0) {
      return res.status(400).json({
        status: 'Warning',
        message: 'No post available in your collection',
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: savePostList,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
