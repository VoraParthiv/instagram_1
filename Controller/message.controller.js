/* eslint-disable object-curly-newline */
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { v4: uuid4 } = require('uuid');
const path = require('path');
const { default: mongoose } = require('mongoose');

const messageSchema = require('../Model/messageSchema');
const { io } = require('../socket');

// View other user list in message
exports.messageList = async (req, res) => {
  try {
    const messageList = await messageSchema.aggregate([
      {
        $match: {
          $or: [
            { fromUserId: { $eq: new mongoose.Types.ObjectId(req.userId) } },
            { toUserId: { $eq: new mongoose.Types.ObjectId(req.userId) } },
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'toUserId',
          foreignField: '_id',
          as: 'personalChat',
        },
      },
      { $unwind: { path: '$personalChat' } },
      {
        $lookup: {
          from: 'groups',
          localField: 'groupId',
          foreignField: '_id',
          as: 'groupChat',
        },
      },
      {
        $project: {
          'personalChat._id': 1,
          'personalChat.name': 1,
          toUserId: 1,
          fromUserId: 1,
          groupId: 1,
          'groupChat.createUserId': 1,
          'groupChat.groupName': 1,
          'groupChat.groupImage': 1,
          messageTime: 1,
        },
      },
      {
        $sort: {
          messageTime: -1,
        },
      },
    ]);
    return res.status(200).json({
      status: 'Success',
      data: messageList,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Message like by user
exports.messageLikeByUser = async (req, res) => {
  const { messageId } = req.body;
  try {
    await messageSchema.updateOne(
      { _id: { $eq: new mongoose.Types.ObjectId(messageId) } },
      { $push: { messageLike: new mongoose.Types.ObjectId(req.userId) } },
    );
    return res.status(200).json({
      status: 'Success',
      message: 'Message like',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Message like view by user
exports.messageLikeView = async (req, res) => {
  try {
    const messageLikeData = await messageSchema.aggregate([
      {
        $match: {
          _id: {
            $eq: new mongoose.Types.ObjectId(req.params.messageId),
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'messageLike',
          foreignField: '_id',
          as: 'likeByUser',
        },
      },
      {
        $unwind: {
          path: '$likeByUser',
        },
      },
      {
        $group: {
          _id: '$_id',
          userInfo: { $push: '$likeByUser' },
          likeCount: { $sum: 1 },
        },
      },
      {
        $project: {
          'userInfo._id': 1,
          'userInfo.name': 1,
          likeCount: 1,
        },
      },
    ]);
    return res.status(200).json({
      status: 'Success',
      data: messageLikeData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Find room id fro group
async function findGroupRoomId(groupId) {
  const roomIdExist = await messageSchema.aggregate([
    {
      $match: {
        groupId: { $eq: new mongoose.Types.ObjectId(groupId) },
      },
    },
  ]);
  if (roomIdExist.length === 0) {
    const roomId = uuidv4();
    return roomId;
  }
  return roomIdExist[0].roomId;
}

// Find messages of personal chat
async function findMessagesOfUser(fromUserId, toUserId) {
  const messageData = await messageSchema.aggregate([
    {
      $match: {
        $or: [
          {
            $and: [
              { fromUserId: { $eq: new mongoose.Types.ObjectId(fromUserId) } },
              { toUserId: { $eq: new mongoose.Types.ObjectId(toUserId) } },
            ],
          },
          {
            $and: [
              { fromUserId: { $eq: new mongoose.Types.ObjectId(toUserId) } },
              { toUserId: { $eq: new mongoose.Types.ObjectId(fromUserId) } },
            ],
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'toUserId',
        foreignField: '_id',
        as: 'receiverInfo',
      },
    },
    {
      $unwind: {
        path: '$receiverInfo',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'fromUserId',
        foreignField: '_id',
        as: 'senderInfo',
      },
    },
    {
      $unwind: {
        path: '$senderInfo',
      },
    },
    {
      $project: {
        'receiverInfo._id': 1,
        'receiverInfo.name': 1,
        'senderInfo._id': 1,
        'senderInfo.name': 1,
        fromUserId: 1,
        toUserId: 1,
        message: 1,
        messageType: 1,
        messageTime: 1,
        result: 1,
      },
    },
  ]);
  return messageData;
}

// Find messages of group chat
async function findMessagesOfGroup(groupId) {
  const messageData = await messageSchema.aggregate([
    {
      $match: {
        groupId: { $eq: new mongoose.Types.ObjectId(groupId) },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'fromUserId',
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
        'userInfo._id': 1,
        'userInfo.name': 1,
        fromUserId: 1,
        message: 1,
        messageType: 1,
        messageTime: 1,
        result: 1,
        groupId: 1,
      },
    },
  ]);
  return messageData;
}

async function sendImageMessage(message, tempImgExt, socket, data) {
  const imageIntoBuffer = Buffer.from(message, 'base64');
  const fileName = `msg-post-${uuid4()}.${tempImgExt}`;
  const filePath = path.join(__dirname, '../public/images/Base64', fileName);

  await fs.writeFile(filePath, imageIntoBuffer, async (error) => {
    if (error) {
      socket.emit('errorResponse', { error: error.message });
    }
    if (data.toUserId) {
      const newObj = {
        fromUserId: data.fromUserId,
        toUserId: data.toUserId,
        roomId: data.roomId,
        message: fileName,
        messageType: 'Image',
      };
      io.to(data.roomId).emit('receivedMessage', { data: newObj });
      await messageSchema.create(newObj);
    }
    const newObj = {
      fromUserId: data.fromUserId,
      groupId: data.groupId,
      roomId: data.roomId,
      message: fileName,
      messageType: 'Image',
    };
    io.to(data.roomId).emit('receivedMessage', { data: newObj });
    await messageSchema.create(newObj);
  });
}

// Chat Functionality
io.on('connection', (socket) => {
  socket.on('chatJoin', async ({ fromUserId, toUserId, groupId }) => {
    if (toUserId) {
      const roomIdExist = await messageSchema.find({
        $or: [
          {
            $and: [
              { fromUserId: { $eq: new mongoose.Types.ObjectId(fromUserId) } },
              { toUserId: { $eq: new mongoose.Types.ObjectId(toUserId) } },
            ],
          },
          {
            $and: [
              { fromUserId: { $eq: new mongoose.Types.ObjectId(toUserId) } },
              { toUserId: { $eq: new mongoose.Types.ObjectId(fromUserId) } },
            ],
          },
        ],
      });
      if (roomIdExist.length === 0) {
        const roomId = uuidv4();
        socket.emit('receivedRoomId', { roomId });
        socket.join(roomId);
      } else {
        socket.join(roomIdExist[0].roomId);
        socket.emit('receivedRoomId', { roomId: roomIdExist[0].roomId });
        const j = await findMessagesOfUser(fromUserId, toUserId);
        socket.emit('messageList', { data: j });
      }
    } else {
      const getRoomId = await findGroupRoomId(groupId);
      socket.join(getRoomId);
      socket.emit('receivedRoomId', { roomId: getRoomId });
      const groupMessages = await findMessagesOfGroup(groupId);
      socket.emit('messageList', { data: groupMessages });
    }
  });

  socket.on('sendMessage', async (data) => {
    const { fromUserId, toUserId, roomId, message, groupId } = data;
    if (toUserId) {
      const imageCheck = message.split(',')[0].split(';')[0].split(':')[1];
      let tempImgExt = null;
      if (imageCheck === 'image/jpeg') {
        tempImgExt = 'jpeg';
        sendImageMessage(message, tempImgExt, socket, data);
      } else if (imageCheck === 'image/jpg') {
        tempImgExt = 'jpg';
        sendImageMessage(message, tempImgExt, socket, data);
      } else if (imageCheck === 'image/png') {
        tempImgExt = 'png';
        sendImageMessage(message, tempImgExt, socket, data);
      } else {
        const newObj = {
          fromUserId,
          toUserId,
          roomId,
          message,
          messageType: 'Text',
        };
        io.to(roomId).emit('receivedMessage', { data: newObj });
        await messageSchema.create(newObj);
      }
    } else {
      const imageCheck = message.split(',')[0].split(';')[0].split(':')[1];
      let tempImgExt = null;
      if (imageCheck === 'image/jpeg') {
        tempImgExt = 'jpeg';
        sendImageMessage(message, tempImgExt, socket, data);
      } else if (imageCheck === 'image/jpg') {
        tempImgExt = 'jpg';
        sendImageMessage(message, tempImgExt, socket, data);
      } else if (imageCheck === 'image/png') {
        tempImgExt = 'png';
        sendImageMessage(message, tempImgExt, socket, data);
      } else {
        const newObj = {
          fromUserId,
          groupId,
          roomId,
          message,
          messageType: 'Text',
        };
        io.to(roomId).emit('receivedMessage', { data: newObj });
        await messageSchema.create(newObj);
      }
    }
  });
});
