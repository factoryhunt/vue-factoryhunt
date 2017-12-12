const router = require('express').Router()

const lead = require('./lead')
const account = require('./account')
const contact = require('./contact')
const product = require('./product')

router.use('/lead', lead)
router.use('/account', account)
router.use('/contact', contact)
router.use('/product', product)

module.exports = router