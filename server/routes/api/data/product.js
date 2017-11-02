var express = require('express');
var router = express.Router();
var mysql = require('../../../models/mysql');

// return all products
router.get('/', function(req, res, next) {
  mysql.query(`SELECT * FROM products LIMIT 6`, function(err, rows) {
    if (err) throw err;
    results = rows;
    res.send(results);
  });
});

// return an product
router.get('/id/:id', function (req, res, next) {
  const id = req.params.id;

  mysql.query(`SELECT * FROM products WHERE product_id='${id}'`, function(err, rows) {
    if (err) throw err;
    const account = rows[0];
    res.send(account);
  });
});

// return filtered products by product_name
router.get('/name/:input', function (req, res, next) {
  const input = req.params.input.toLowerCase();
  console.log(input)
  mysql.query(`SELECT * FROM products WHERE lower(product_name) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err;
    results = rows;
    res.send(results);
  });
});

// return filtered products by product_name
router.get('/count/:input', function (req, res, next) {
  const input = req.params.input.toLowerCase();
  console.log(input)
  mysql.query(`SELECT count(*) as count FROM products WHERE lower(product_name) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err;
    count = rows[0];
    res.send(count);
  });
});

// return filtered products by account_id
router.get('/account_id/:id', function (req, res, next) {
  const id = req.params.id;
  console.log(id)
  mysql.query(`SELECT * FROM products WHERE account_id = ${id}`, function(err, rows) {
    if (err) throw err;
    product = rows

    res.send(product);
  })
});

module.exports = router;