const express = require('express');

const router = express.Router();

router.use(
  '/post',
  require('./post.routes'),
  require('./postLike.routes'),
  require('./postComment.routes'),
);

module.exports = router;
