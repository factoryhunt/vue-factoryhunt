const router = require('express').Router();

const upload = require('./upload');
const get = require('./get');

router.post('/account/upload/:id', upload);
router.get('/account/get/:id', get);

module.exports = router;