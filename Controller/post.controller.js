/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
const path = require('path');
const { v4: uuid4 } = require('uuid');
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const postSchema = require('../Model/postSchema');
const { postValidation } = require('../utils/validation');

// Add post by User Using Multer
exports.postAddByUser = async (req, res) => {
  try {
    const { userId } = req;
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const { error, value } = postValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const extname = path.extname(req.file.originalname);
    if (allowedExtensions.includes(extname)) {
      const newObj = {
        userId,
        postImage: req.file.filename,
        postType: 'Image',
        description: value.description,
      };
      await postSchema.create(newObj);
      return res.status(200).json({
        status: 'Success',
        message: 'Post has been added successfully.',
      });
    }
    return res.status(400).json({
      status: 'Error',
      message: 'Only image files (jpg, jpeg, png) are allowed.',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// View all post by User
exports.allPostViewByUser = async (req, res) => {
  try {
    const postLists = await postSchema.find({
      userId: { $eq: new mongoose.Types.ObjectId(req.userId) },
    });
    return res.status(200).json({
      status: 'Success',
      postLists,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// View single post by User
exports.postViewByPostId = async (req, res) => {
  try {
    const post = await postSchema.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        status: 'Error',
        message: 'Post not found.',
      });
    }
    return res.status(200).json({
      status: 'Success',
      post,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Delete post by User
exports.deletePostByPostId = async (req, res) => {
  try {
    await postSchema.findByIdAndDelete(
      new mongoose.Types.ObjectId(req.params.postId),
    );
    return res.status(200).json({
      status: 'Success',
      message: 'Your post has been deleted.',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

async function uploadImage(postImage) {
  let tempImgExt = null;
  const findImgExt = postImage.split(',')[0].split(';')[0].split(':')[1];
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

// Add post by User Using Base64
exports.postAddByUserBase64 = async (req, res) => {
  const { userId } = req;
  try {
    const { error, value } = postValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const imageExt = await uploadImage(value.postImage);
    if (imageExt === false) {
      return res.status(400).json({
        status: 'Error',
        message: 'Only allow jpeg, png, or jpg format images for upload post',
      });
    }
    const imageIntoBuffer = Buffer.from(value.postImage, 'base64');
    const fileName = `user-post-${uuid4()}.${imageExt}`;
    const filePath = path.join(__dirname, '../public/images/Base64', fileName);
    await fs.writeFile(filePath, imageIntoBuffer, async (err) => {
      if (err) {
        res.json({ err: err.message });
      }
      const newObj = {
        userId,
        description: value.description,
        postImage: fileName,
        postType: 'Image',
      };
      const data = await postSchema.create(newObj);
      return res.status(200).json({
        status: 'Success',
        message: 'Post has been added successfully.',
        data,
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
