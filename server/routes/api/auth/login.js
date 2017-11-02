module.exports = (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log('POST /login called');
  console.log(req.user);
  res.redirect('/mypage');
}
