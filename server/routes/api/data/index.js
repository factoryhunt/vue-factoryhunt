const router = require('express').Router();

const lead = require('./lead');
const account = require('./account');
const product = require('./product');
const category = require('./category');

router.use('/lead', lead);
router.use('/account', account);
router.use('/product', product);
router.use('/category', category);

module.exports = router;