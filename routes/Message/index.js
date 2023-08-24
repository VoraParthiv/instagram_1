const express = require('express');

const router = express.Router();

router.use('/chat', require('./message.routes'));

module.exports = router;
