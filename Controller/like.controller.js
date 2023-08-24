const { default: mongoose } = require('mongoose');
const likeSchema = require('../Model/likeSchema');
const { postLikeValidation } = require('../utils/validation');

// Like by User on post
exports.likeByUser = async (req, res) => {
  try {
    const { error, value } = postLikeValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const newObj = {
      postId: value.postId,
      likeByUserId: req.userId,
    };
    await likeSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'like add...!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Like view by User of the selected post
exports.viewLikeOnPost = async (req, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.postId);
    if (isValid) {
      const likeData = await likeSchema.aggregate([
        {
          $match: {
            postId: {
              $eq: new mongoose.Types.ObjectId(req.params.postId),
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'likeByUserId',
            foreignField: '_id',
            as: 'userInfo',
          },
        },
        {
          $unwind: {
            path: '$userInfo',
          },
        },
        {
          $group: {
            _id: '$postId',
            likeCount: { $sum: 1 },
            likeData: { $push: '$userInfo' },
          },
        },
        {
          $project: {
            _id: 0,
            postId: '$_id',
            likeCount: 1,
            'likeData._id': 1,
            'likeData.name': 1,
          },
        },
      ]);
      return res.status(200).json({
        status: 'Success',
        likeData,
      });
    }
    return res.status(400).json({
      status: 'Error',
      message: 'Please, Enter valid post id',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Like remove by User of the selected post
exports.removeLikeOnPost = async (req, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.postId);
    if (isValid) {
      await likeSchema.deleteOne({
        $and: [
          { postId: { $eq: new mongoose.Types.ObjectId(req.params.postId) } },
          { likeByUserId: { $eq: new mongoose.Types.ObjectId(req.userId) } },
        ],
      });
      return res.status(200).json({
        status: 'Success',
        message: 'Like remove',
      });
    }
    return res.status(400).json({
      status: 'Error',
      message: 'Please, Enter valid post id',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
