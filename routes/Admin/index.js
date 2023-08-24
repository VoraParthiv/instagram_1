const express = require('express');

const router = express.Router();

router.use(
  '/admin',
  require('./admin.routes'),
  require('./topic.routes'),
  require('./lang.routes'),
  require('./location.routes'),
);

module.exports = router;
