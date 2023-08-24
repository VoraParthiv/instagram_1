const express = require('express');

const router = express.Router();

router.use(
  '/action',
  require('./blockUser.routes'),
  require('./savePost.routes'),
  require('./similarly.routes'),
  require('./report.routes'),
);

module.exports = router;
