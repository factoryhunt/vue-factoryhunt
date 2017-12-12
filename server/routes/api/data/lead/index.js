const router = require('express').Router()

const retrieve = require('./retrieve')

router.use('/', retrieve)

module.exports = router