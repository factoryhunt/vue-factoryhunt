const router = require('express').Router();

const mail = require('./mail');

router.use('/', mail);

module.exports = router;