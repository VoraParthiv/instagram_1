const { default: mongoose } = require('mongoose');
const commentSchema = require('../Model/commentSchema');
const postSchema = require('../Model/postSchema');
const { postCommentValidation } = require('../utils/validation');

// Comment by User on post
exports.commentAddByUser = async (req, res) => {
  try {
    const { error, value } = postCommentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const data = await commentSchema.create(value);
    return res.status(200).json({
      status: 'Success',
      message: 'Comment are post...!',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Comment delete on post
async function commentDeleteFunction(cId, userId) {
  const findUserOfComment = await commentSchema.find({
    $and: [
      { _id: { $eq: new mongoose.Types.ObjectId(cId) } },
      { commentByUserId: { $eq: new mongoose.Types.ObjectId(userId) } },
    ],
  });
  if (findUserOfComment.length === 0) {
    const findUserOfPost = await postSchema.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'postInfo',
        },
      },
      {
        $unwind: {
          path: '$postInfo',
        },
      },
      {
        $match: {
          userId: {
            $eq: new mongoose.Types.ObjectId(userId),
          },
        },
      },
    ]);
    return findUserOfPost;
  }
  return findUserOfComment;
}

exports.commentDelete = async (req, res) => {
  const { cId } = req.params;
  const { userId } = req;
  try {
    const commentData = await commentDeleteFunction(cId, userId);
    if (commentData.length === 0) {
      return res.status(401).json({
        status: 'Warning',
        message: 'You can not deleted this comment',
      });
    }
    await commentSchema.deleteOne({
      _id: new mongoose.Types.ObjectId(cId),
    });
    return res.status(200).json({
      status: 'Success',
      message: 'Comment are deleted',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Comment view on post
exports.commentViewListOfPost = async (req, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.postId);
    if (isValid) {
      const data = await commentSchema.aggregate([
        {
          $match: {
            postId: { $eq: new mongoose.Types.ObjectId(req.params.postId) },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'commentByUserId',
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
          $project: {
            postId: 1,
            comment: 1,
            commentTime: 1,
            'userInfo._id': 1,
            'userInfo.name': 1,
          },
        },
      ]);
      return res.status(200).json({
        status: 'Success',
        data,
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
