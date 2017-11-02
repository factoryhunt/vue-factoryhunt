const router = require('express').Router();

const amount = require('./amount');

router.post('/amount', amount);

module.exports = router;