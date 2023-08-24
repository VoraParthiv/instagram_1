const express = require('express');

const router = express.Router();

router.use('/', require('./Users/index'));
router.use('/', require('./Admin/index'));
router.use('/', require('./Profile/index'));
router.use('/', require('./Posts/index'));
router.use('/', require('./Message/index'));
router.use('/', require('./UserAction/index'));
router.use('/', require('./Group/index'));

module.exports = router;
