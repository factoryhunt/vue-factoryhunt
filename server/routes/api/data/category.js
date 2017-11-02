const router = require('express').Router();
const mysql = require('../../../models/mysql');

router.get('/', function (req, res) {
  mysql.query('SELECT * FROM categories', function(err, rows) {
    if (err) throw err;

    categories = rows;
    res.send(categories);
  })
});

router.get('/primary', function (req, res) {
  mysql.query('SELECT primary_category FROM categories', function(err, rows) {
    if (err) throw err;

    sub_categories = rows;
    res.send(sub_categories);
  })
});

router.get('/primary/:input', function (req, res) {
  const input = req.params.input.toLowerCase();

  mysql.query(`SELECT * FROM categories WHERE lower(primary_category) LIKE "%${input}%"`, function(err, rows) {
    if (err) throw err;

    primary_categories = rows;
    res.send(primary_categories);
  })
});

router.get('/sub', function (req, res) {
  mysql.query('SELECT sub_category FROM categories', function(err, rows) {
    if (err) throw err;

    sub_categories = rows;
    res.send(sub_categories);
  })
});

router.get('/sub/:input', function (req, res) {
  const input = req.params.input.toLowerCase();

  mysql.query(`SELECT * FROM categories WHERE lower(sub_category) LIKE "%${input}%"`, function(err, rows) {
    if (err) throw err;

    sub_categories = rows;
    res.send(sub_categories);
  })
});

module.exports = router;