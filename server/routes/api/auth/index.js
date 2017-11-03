const router = require('express').Router();
const passport = require('passport');

const register = require('./register');
const auth = require('./authenticate');
const login = require('./login');
const logout = require('./logout');

const session = require('./session');

router.post('/register', register);
router.post('/login', auth.authenticate, login);

router.get('/session', session);
router.get('/logout', logout);
router.get('/mypage', auth.isLoggedIn, auth.authCheckCallback);

module.exports = router;

