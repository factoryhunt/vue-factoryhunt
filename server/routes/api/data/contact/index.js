const router = require('express').Router()

const retrieve = require('./retrieve')
const update = require('./update')
const remove = require('./delete')

router.use('/', retrieve)
router.use('/', update)
router.use('/', remove)

module.exports = router