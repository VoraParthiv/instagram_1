/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
const { default: mongoose } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const groupSchema = require('../Model/groupSchema');
const { groupValidation } = require('../utils/validation');

async function uploadImage(groupImage) {
  let tempImgExt = null;
  const findImgExt = groupImage.split(',')[0].split(';')[0].split(':')[1];
  if (findImgExt === 'image/jpg') {
    tempImgExt = 'jpg';
    return tempImgExt;
  } else if (findImgExt === 'image/jpeg') {
    tempImgExt = 'jpeg';
    return tempImgExt;
  } else if (findImgExt === 'image/png') {
    tempImgExt = 'png';
    return tempImgExt;
  } else {
    return false;
  }
}

// Group Create
exports.createGroupByUser = async (req, res) => {
  try {
    const { error, value } = groupValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    if (value.groupImage) {
      const imageExt = await uploadImage(value.groupImage);
      if (imageExt === false) {
        return res.status(400).json({
          status: 'Error',
          message: 'Only allow jpeg, png, or jpg format images for upload post',
        });
      }
      const imageIntoBuffer = Buffer.from(value.groupImage, 'base64');
      const fileName = `group-icon-${uuidv4()}.${imageExt}`;
      const filePath = path.join(
        __dirname,
        '../public/images/GroupIcon/',
        fileName,
      );
      fs.writeFile(filePath, imageIntoBuffer, (errorImg) => {
        if (errorImg) {
          res.json({ error: errorImg.message });
        }
      });
      const newObj = {
        createUserId: req.userId,
        groupName: value.groupName,
        addUser: value.addUser,
        groupImage: fileName,
      };
      const data = await groupSchema.create(newObj);
      return res.status(200).json({
        status: 'Success',
        message: 'Group are created....!',
        data,
      });
    }
    await groupSchema.create(value);
    return res.status(200).json({
      status: 'Success',
      message: 'Group are created....!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Add user into group
exports.addUserIntoGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const findAdmin = await groupSchema.find({
      createUserId: { $eq: new mongoose.Types.ObjectId(req.userId) },
    });
    if (findAdmin.length === 0) {
      return res.status(400).json({
        status: 'Warning',
        message: 'Only admin can add user into the group',
      });
    }
    await groupSchema.updateOne(
      { _id: { $eq: new mongoose.Types.ObjectId(groupId) } },
      { $push: { addUser: userId } },
    );
    return res.status(200).json({
      status: 'Success',
      message: 'User are add into group....!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Remove user into group
exports.removeUserGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const data = await groupSchema.updateOne(
      {
        _id: { $eq: new mongoose.Types.ObjectId(groupId) },
        createUserId: { $eq: new mongoose.Types.ObjectId(req.userId) },
      },
      { $pull: { addUser: userId } },
    );
    if (data.matchedCount === 0) {
      return res.status(403).json({
        status: 'Warning',
        message: 'Only admin can remove user from the group',
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: 'User are remove from the group',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// List of user into group
exports.listUserGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const data = await groupSchema.aggregate([
      {
        $match: {
          _id: { $eq: new mongoose.Types.ObjectId(groupId) },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'addUser',
          foreignField: '_id',
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
          createUserId: 1,
          groupName: 1,
          groupImage: 1,
          'result._id': 1,
          'result.name': 1,
        },
      },
    ]);
    return res.status(200).json({
      status: 'Success',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
