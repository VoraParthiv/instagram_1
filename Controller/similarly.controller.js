const { default: mongoose } = require('mongoose');
const locationSchema = require('../Model/locationSchema');
const userInterestSchema = require('../Model/userInterestSchema');

// Find Similarly User
exports.findSimilarlyUser = async (req, res) => {
  try {
    const selectData = await userInterestSchema.aggregate([
      {
        $match: {
          userId: { $eq: new mongoose.Types.ObjectId(req.userId) },
        },
      },
      {
        $group: {
          _id: '$userId',
          topicId: { $push: '$topicId' },
        },
      },
      {
        $lookup: {
          from: 'locations',
          localField: '_id',
          foreignField: 'userId',
          as: 'result',
        },
      },
      {
        $unwind: {
          path: '$result',
        },
      },
      {
        $project: {
          topicId: 1,
          'result.location': 1,
        },
      },
    ]);
    const similarlyUser = await locationSchema.aggregate([
      {
        $geoNear: {
          near: selectData[0].result.location,
          distanceField: 'distance',
          minDistance: 1000,
          spherical: true,
        },
      },
      {
        $sort: {
          distance: 1,
        },
      },
      {
        $lookup: {
          from: 'userinterests',
          localField: 'userId',
          foreignField: 'userId',
          as: 'userSelectInfo',
        },
      },
      {
        $unwind: {
          path: '$userSelectInfo',
        },
      },
      {
        $group: {
          _id: '$userId',
          result: { $push: '$userSelectInfo' },
        },
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'result.langId',
          foreignField: '_id',
          as: 'userLanguageInfo',
        },
      },
      {
        $unwind: {
          path: '$userLanguageInfo',
        },
      },
      {
        $lookup: {
          from: 'topics',
          localField: 'result.topicId',
          foreignField: '_id',
          as: 'userTopicInfo',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'result.userId',
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
        $addFields: {
          userTopicInfo: {
            $filter: {
              input: '$userTopicInfo',
              as: 'item',
              cond: { $in: ['$$item._id', selectData[0].topicId] },
            },
          },
        },
      },
      {
        $unwind: {
          path: '$userTopicInfo',
        },
      },
      {
        $group: {
          _id: '$_id',
          userLanguageInfo: { $first: '$userLanguageInfo' },
          userInfo: { $first: '$userInfo' },
          userTopicInfo: { $push: '$userTopicInfo' },
        },
      },
      {
        $project: {
          'userLanguageInfo._id': 1,
          'userLanguageInfo.languageName': 1,
          'userInfo._id': 1,
          'userInfo.name': 1,
          'userTopicInfo._id': 1,
          'userTopicInfo.topicName': 1,
          distance: 1,
          userId: 1,
        },
      },
    ]);
    if (similarlyUser.length === 0) {
      return res.status(400).json({
        status: 'Warning',
        message: 'No such users are found of your interest',
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: similarlyUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
