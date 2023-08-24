const express = require('express');

const router = express.Router();

router.use('/profile', require('./profile.routes'));

module.exports = router;
