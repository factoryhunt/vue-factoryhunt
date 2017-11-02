const passport = require('passport');

exports.authenticate = passport.authenticate('local', {
  failureRedirect: '/register',
  failureFlash: true
});

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/register');
};

exports.authCheckCallback = (req, res, next) => {
  res.render('mypage',{
    contact: req.user
  })
}
