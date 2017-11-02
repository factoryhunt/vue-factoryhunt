const router = require('express').Router();

const auth = require('./auth');
const data = require('./data');
const aws = require('./aws');
const open = require('./open');
const mail = require('./mail');

router.use('/auth', auth);
router.use('/data', data);
router.use('/aws', aws);
router.use('/open', open);
router.use('/mail', mail);

module.exports = router;