const { default: mongoose } = require('mongoose');
const userSchema = require('../Model/userSchema');
const followSchema = require('../Model/followSchema');
const requestSchema = require('../Model/requestSchema');
const {
  userSearchValidation,
  userFollowValidation,
  userFollowViewValidation,
  followRequestValidation,
} = require('../utils/validation');

// Profile View of any User
exports.viewAnyUserProfile = async (req, res) => {
  try {
    const userProfile = await userSchema.find({
      _id: { $eq: new mongoose.Types.ObjectId(req.params.userId) },
    });
    if (userProfile.length === 0) {
      return res.status(400).json({
        status: 'Warning',
        message: 'User not found',
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: userProfile,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Search user using user name
exports.searchUserList = async (req, res) => {
  try {
    const { error, value } = userSearchValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const searchUserListData = await userSchema.find({
      name: { $regex: value.name, $options: 'i' },
    });
    if (searchUserListData.length === 0) {
      return res.status(400).json({
        status: 'Warning',
        message: 'User not found',
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: searchUserListData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Follow User
exports.followUser = async (req, res) => {
  try {
    const { error, value } = userFollowValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const userInfo = await userSchema.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(value.followingUserId),
        },
      },
    ]);
    if (userInfo[0].profile === 'Private') {
      const newObj = {
        followUserId: req.userId,
        followingUserId: value.followingUserId,
      };
      await requestSchema.create(newObj);
      return res.status(200).json({
        status: 'Success',
        message: 'Requested',
      });
    }
    const newObj = {
      followUserId: req.userId,
      followingUserId: value.followingUserId,
    };
    await followSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'You starting following',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Follow User View
exports.followUserView = async (req, res) => {
  try {
    const { error, value } = userFollowViewValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    if (value.label === 'Following') {
      const followingInfo = await followSchema.aggregate([
        {
          $match: {
            followUserId: { $eq: new mongoose.Types.ObjectId(req.userId) },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'followingUserId',
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
            _id: '$followUserId',
            userInfo: { $push: '$userInfo' },
            followingCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            followUserId: '$_id',
            'userInfo._id': 1,
            'userInfo.name': 1,
            followingCount: 1,
          },
        },
      ]);
      return res.status(200).json({
        status: 'Success',
        data: followingInfo,
      });
    }
    const followersInfo = await followSchema.aggregate([
      {
        $match: {
          followingUserId: { $eq: new mongoose.Types.ObjectId(req.userId) },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followUserId',
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
          _id: '$followingUserId',
          userInfo: { $push: '$userInfo' },
          followersCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          followingUserId: '$_id',
          'userInfo._id': 1,
          'userInfo.name': 1,
          followersCount: 1,
        },
      },
    ]);
    return res.status(200).json({
      status: 'Success',
      data: followersInfo,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Follow request view User
exports.requestViewByUser = async (req, res) => {
  try {
    const requestList = await requestSchema.aggregate([
      {
        $match: {
          followingUserId: { $eq: new mongoose.Types.ObjectId(req.userId) },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followUserId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      { $unwind: { path: '$userInfo' } },
      {
        $project: {
          followingUserId: 1,
          'userInfo._id': 1,
          'userInfo.name': 1,
        },
      },
    ]);
    return res.status(200).json({
      status: 'Success',
      data: requestList,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Follow request Accepted by User
exports.requestAcceptedByUser = async (req, res) => {
  try {
    const { error, value } = followRequestValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const newObj = {
      followUserId: value.followingUserId,
      followingUserId: req.userId,
      requestStatus: 'Accepted',
    };
    await followSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'Request accepted',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Follow request Rejected by User
exports.requestRejectedByUser = async (req, res) => {
  try {
    const { error, value } = followRequestValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const newObj = {
      followUserId: req.userId,
      followingUserId: value.followingUserId,
    };
    await followSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'Request accepted',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
