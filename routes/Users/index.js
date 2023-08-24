const express = require('express');

const router = express.Router();

router.use('/user', require('./user.routes'), require('./selection.routes'));

module.exports = router;
