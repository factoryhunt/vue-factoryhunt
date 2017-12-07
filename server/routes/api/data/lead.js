const express = require('express');
const router = express.Router();
const mysql = require('../../../models/mysql');
const crypto = require('crypto')
const CONFIG_MYSQL = require('../../../config/mysql_config')

// return all leads
router.get('/', function(req, res, next) {
  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS}`, function(err, rows) {
    if (err) throw err;
    leads = rows;
    res.send(leads);
  })
});

// return a lead
router.get('/id/:id', function(req, res, next) {
  const id = parseInt(req.params.id, 10);
  console.log(id);

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lead_id='${id}'`, function(err, rows) {
    if (err) throw err;
    const lead = rows[0];
    // var lead = leads.filter(function(lead) {
    //   return lead.id === id
    // });
    res.send(lead);
  });
});

// return filtered leads by products_english
router.get('/:input', function (req, res, next) {
  console.log('leads called');
  const input = req.params.input.toLowerCase();
  console.log(input);

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products_english) LIKE "%${input}%" ORDER BY number_of_employees DESC LIMIT 7`, function(err, rows) {
    if (err) throw err;
    leads = rows;
    res.send(leads);
  });
});

// return all lead count filtered by products_english
router.get('/:input/count', function (req, res, next) {
  console.log('leads count called');
  const input = req.params.input.toLowerCase();
  console.log(input);

  mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products_english) LIKE "%${input}%"`, function(err, rows) {
    if (err) throw err;
    count = rows[0];
    res.send(count);
  });
});

// return filtered leads by company
router.get('/company/:input', function (req, res, next) {
  console.log('leads called');
  const input = req.params.input.toLowerCase();
  console.log(input);

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(company_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err;
    leads = rows;
    res.send(leads);
  });
});

// return pagination lead
router.get('/:input/:page', function (req, res) {
  console.log('leads page called');
  const input = req.params.input.toLowerCase();
  var page = Number(req.params.page);
  page = (page * 10);

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products_english) LIKE "%${input}%" ORDER BY number_of_employees DESC LIMIT ${page}, 10`, function(err, rows) {
    if (err) throw err;
    results = rows;
    res.send(results);
  })
});

router.post('/upload', function (req, res) {
  console.log('lead create called');

  var company = req.body.company,
    company_english = req.body.company_english,
    lead_type = req.body.lead_type,
    salutation = req.body.salutation,
    first_name = req.body.first_name,
    last_name = req.body.last_name,
    contact_title = req.body.contact_title,
    languages = req.body.languages,
    lead_source = req.body.lead_source,
    customer_priority = req.body.customer_priority,
    lead_status = req.body.lead_status,
    established_date = req.body.established_date,
    number_of_employees = req.body.number_of_employees,
    product_types = req.body.product_types,
    products = req.body.products,
    product_types_english = req.body.product_types_english,
    products_english = req.body.products_english,
    phone = req.body.phone,
    phone_ext = req.body.phone_ext,
    mobile = req.body.mobile,
    fax = req.body.fax,
    website = req.body.website,
    email = req.body.email,
    password = req.body.password,
    notes = req.body.notes,
    mailing_street_address = req.body.mailing_street_address,
    mailing_street_address_2 = req.body.mailing_street_address_2,
    mailing_city = req.body.mailing_city,
    mailing_state = req.body.mailing_state,
    mailing_postal_code = req.body.mailing_postal_code,
    mailing_country = req.body.mailing_contry,
    mailing_street_address_english = req.body.mailing_street_address_english,
    mailing_street_address_2_english = req.body.mailing_street_address_2_english,
    mailing_city_english = req.body.mailing_city_english,
    mailing_state_english = req.body.mailing_state_english,
    mailing_postal_code_english = req.body.mailing_postal_code_english,
    mailing_country_english = req.body.mailing_country_english,
    created_date = req.body.created_date,
    converted_date = req.body.converted_date;

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE email = ?`, email, function (err, rows) {
    if (err) return res.send(err);

    if (!rows[0]) {
      crypto.randomBytes(64, function (err, buf) {
        crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', function (err, key) {

          password = key.toString('base64');
          const password_salt = buf.toString('base64');

          mysql.query(`INSERT INTO leads(
      company,
      company_english,
      lead_type,
      salutation,
      first_name,
      last_name,
      contact_title,
      languages,
      lead_source,
      customer_priority,
      lead_status,
      established_date,
      number_of_employees,
      product_types,
      products,
      product_types_english,
      products_english,
      phone,
      phone_ext,
      mobile,
      fax,
      website,
      email,
      password,
      password_salt,
      notes,
      mailing_street_address,
      mailing_street_address_2,
      mailing_city,
      mailing_state,
      mailing_postal_code,
      mailing_country,
      mailing_street_address_english,
      mailing_street_address_2_english,
      mailing_city_english,
      mailing_state_english,
      mailing_postal_code_english,
      mailing_country_english,
      created_date,
      converted_date
      ) 
      VALUES(
      "${company}",
      "${company_english}",
      "${lead_type}",
      "${salutation}",
      "${first_name}",
      "${last_name}",
      "${contact_title}",
      "${languages}",
      "${lead_source}",
      "${customer_priority}",
      "${lead_status}",
      "${established_date}",
      "${number_of_employees}",
      "${product_types}",
      "${products}",
      "${product_types_english}",
      "${products_english}",
      "${phone}",
      "${phone_ext}",
      "${mobile}",
      "${fax}",
      "${website}",
      "${email}",
      "${password}",
      "${password_salt}",
      "${notes}",
      "${mailing_street_address}",
      "${mailing_street_address_2}",
      "${mailing_city}",
      "${mailing_state}",
      "${mailing_postal_code}",
      "${mailing_country}",
      "${mailing_street_address_english}",
      "${mailing_street_address_2_english}",
      "${mailing_city_english}",
      "${mailing_state_english}",
      "${mailing_postal_code_english}",
      "${mailing_country_english}",
      "${created_date}",
      "${converted_date}")`);

          res.send('register succeed.')
        });
      });
    }
    else {
      res.send('email is already exist.')
    }
  });
});

module.exports = router;
