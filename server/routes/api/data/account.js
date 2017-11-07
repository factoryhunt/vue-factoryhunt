var express = require('express');
var router = express.Router();
var mysql = require('../../../models/mysql');

// return all accounts
router.get('/', function(req, res, next) {
  mysql.query(`SELECT * FROM accounts_copy LIMIT 6`, function(err, rows) {
    if (err) throw err;
    results = rows;
    res.send(results);
  });
});

// return an account by using id
router.get('/id/:id', function (req, res, next) {
  const id = req.params.id;

  mysql.query(`SELECT * FROM accounts_copy WHERE account_id='${id}'`, function(err, rows) {
    if (err) throw err;
    const account = rows[0];
    res.send(account);
  });
});

// // return an account by using company name
router.get('/company/:company', function (req, res, next) {
  const company = req.params.company;

  mysql.query(`SELECT * FROM accounts_copy WHERE domain='${company}'`, function(err, rows) {
    if (err) throw err;
    const account = rows[0];
    res.send(account);
  });
});

// return filtered accounts by product_types_english
router.get('/:input/count', function (req, res, next) {
  const input = req.params.input.toLowerCase();
  console.log(input)
  mysql.query(`SELECT count(*) as count FROM accounts_copy WHERE lower(products_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err;
    count = rows[0];
    res.send(count);
  });
});

// return filtered accounts by product_types_english
router.get('/:input', function (req, res, next) {
  const input = req.params.input.toLowerCase();
  console.log(input)
  mysql.query(`SELECT * FROM accounts_copy WHERE lower(products_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err;
    results = rows;
    res.send(results);
  });
});

// return count of filtered accounts by product_types_english
router.get('/:input/count', function (req, res, next) {
  const input = req.params.input.toLowerCase();
  console.log(input)
  mysql.query(`SELECT count(*) as count FROM accounts WHERE lower(products_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err;
    count = rows[0];
    res.send(count);
  });
});

// return filtered accounts by account_name
router.get('/accountname/:input', function (req, res, next) {
  const input = req.params.input.toLowerCase();
  console.log(input)
  mysql.query(`SELECT * FROM accounts_copy WHERE lower(account_name_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err;
    results = rows;
    res.send(results);
  });
});

// return pagination lead
router.get('/:input/:page', function (req, res) {
  console.log('leads page called');
  const input = req.params.input.toLowerCase();
  var page = Number(req.params.page);
  page = (page * 10);

  mysql.query(`SELECT * FROM accounts WHERE lower(products_english) LIKE "%${input}%" ORDER BY number_of_employees DESC LIMIT ${page}, 10`, function(err, rows) {
    if (err) throw err;
    results = rows;
    res.send(results);
  })
})

// update single account
router.post('/update/:id', function (req, res) {
  console.log('update account called');
  const account_id = req.params.id;
  const account_name = req.body.accountName;
  mysql.query(
    `UPDATE accounts_copy SET account_name_english = "${account_name}" WHERE account_id = ${account_id}`, function (err) {
      if(err) throw err;

      res.send({msg: 'account updated'});
    });
});

module.exports = router;