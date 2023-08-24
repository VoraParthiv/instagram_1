/* eslint-disable object-curly-newline */
const reportSchema = require('../Model/reportSchema');
const { userReportValidation } = require('../utils/validation');

// Report By User on Post or Other User
exports.reportByUser = async (req, res) => {
  try {
    const { error, value } = userReportValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    if (value.profileId) {
      const newObj = {
        reportByUserId: req.userId,
        profileId: value.profileId,
        reason: value.reason,
        reportType: 'Profile',
      };
      await reportSchema.create(newObj);
      return res.status(200).json({
        status: 'Success',
        message: 'Report are success',
      });
    }
    const newObj = {
      reportByUserId: req.userId,
      postId: value.postId,
      reason: value.reason,
      reportType: 'Post',
    };
    await reportSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'Report are success',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Report View By Admin
exports.reportViewByAdmin = async (req, res) => {
  const { label } = req.body;
  try {
    let reportList = null;
    if (label === 'Post') {
      reportList = await reportSchema.aggregate([
        {
          $match: {
            reportType: { $eq: label },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'reportByUserId',
            foreignField: '_id',
            as: 'reportByUserInfo',
          },
        },
        {
          $unwind: {
            path: '$reportByUserInfo',
          },
        },
        {
          $group: {
            _id: '$postId',
            users: { $push: '$reportByUserInfo' },
            reportCount: { $sum: 1 },
          },
        },
        {
          $addFields: {
            reportType: 'Post',
          },
        },
        {
          $project: {
            _id: 0,
            postId: '$_id',
            users: {
              _id: 1,
              name: 1,
            },
            reportCount: 1,
            reportType: 1,
          },
        },
      ]);
    } else {
      reportList = await reportSchema.aggregate([
        {
          $match: {
            reportType: { $eq: label },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'reportByUserId',
            foreignField: '_id',
            as: 'reportByUserInfo',
          },
        },
        {
          $unwind: {
            path: '$reportByUserInfo',
          },
        },
        {
          $group: {
            _id: '$profileId',
            reportUsers: { $push: '$reportByUserInfo' },
            reportCount: { $sum: 1 },
          },
        },
        {
          $addFields: {
            reportType: 'Profile',
          },
        },
        {
          $project: {
            _id: 0,
            profileId: '$_id',
            reportUsers: {
              _id: 1,
              name: 1,
            },
            reportCount: 1,
            reportType: 1,
          },
        },
      ]);
    }
    if (reportList.length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No reports are available',
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: reportList,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
