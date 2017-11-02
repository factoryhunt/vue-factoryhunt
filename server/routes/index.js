var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/api', require('./api'))

router.get('/logo.png', function(req, res) {
  const options = {
    root: __dirname + '/../public/static/',
    headers: {
      'Content-Type': ' image/png'
    }
  };
  res.sendFile('logo_512.png', options);
});

router.get('/robots.txt', function(req, res) {
  const options = {
    root: __dirname + '/../public/static/',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  };
  res.sendFile('robots.txt', options);
});

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

module.exports = router;