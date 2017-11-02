const router = require('express').Router();

const upload = require('./upload');
const get = require('./get');

router.post('/upload', upload);
router.post('/get', get);

module.exports = router;