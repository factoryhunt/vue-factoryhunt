const router = require('express').Router()
const passport = require('passport')

const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const check = require('./check')
const verify = require('./verify')
const authMiddleware = require('../../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

router.get('/check', authMiddleware, check)

router.get('/email_verify', verify)

module.exports = router

