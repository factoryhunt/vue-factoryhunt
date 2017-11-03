module.exports = (req, res) => {
  console.log('session() called');
  console.log('session', req.session);
  // console.log('cookie', req.headers.cookie);
  res.json(req.session);
}