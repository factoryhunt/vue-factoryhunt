module.exports = (req, res) => {
  console.log('GET /logout called');
  req.logout();
  res.redirect('/register');
}