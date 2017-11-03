const passport = require('passport');

exports.authenticate = passport.authenticate('local', {
  failureRedirect: '/register',
  failureFlash: true
});

exports.isLoggedIn = (req, res, next) => {
  console.log('isLoggedIn() called');
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('isLoggedIn() denied');
  res.send({result: false});
};

exports.authCheckCallback = (req, res) => {
  console.log('authCheck() success');
  res.send(req.user);
}