module.exports = (req, res) => {
  console.log('session() called');
  console.log('session', req.session);
  res.json(req.session);
}