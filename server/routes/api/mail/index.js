const router = require('express').Router()

const mail = require('./mail')
const signup = require('./signup')

router.use('/', mail)
router.post('/signup', signup)

module.exports = router