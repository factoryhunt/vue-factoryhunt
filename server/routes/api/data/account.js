const router = require('express').Router()
const mysql = require('../../../models/mysql')
const multer = require('multer')
const CONFIG_MYSQL = require('../../../config/mysql_config')

// return all accounts
router.get('/', function(req, res, next) {
  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} LIMIT 6`, function(err, rows) {
    if (err) throw err
    results = rows
    res.send(results)
  })
})

// return an account by using id
router.get('/id/:id', function (req, res) {
  const id = req.params.id

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE account_id='${id}'`, function(err, rows) {
    if (err) throw err
    const account = rows[0]
    res.send(account)
  });
});

// // return an account by using company name
router.get('/company/:company', function (req, res) {
  const company = req.params.company

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE domain='${company}'`, function(err, rows) {
    if (err) throw err
    const account = rows[0]
    res.send(account)
  });
});

// return filtered accounts by product_types_english
router.get('/:input/count', function (req, res) {
  const input = req.params.input.toLowerCase()
  console.log(input)
  mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err
    count = rows[0]
    res.send(count)
  });
});

// return filtered accounts by product_types_english
router.get('/:input', function (req, res) {
  const input = req.params.input.toLowerCase()
  console.log(input)
  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err
    results = rows
    res.send(results)
  });
});

// return count of filtered accounts by product_types_english
router.get('/:input/count', function (req, res) {
  const input = req.params.input.toLowerCase()
  console.log(input)
  mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err
    count = rows[0]
    res.send(count)
  });
});

// return filtered accounts by account_name
router.get('/accountname/:input', function (req, res) {
  const input = req.params.input.toLowerCase()
  console.log(input)
  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(account_name_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err
    results = rows
    res.send(results)
  });
});

// return pagination lead
router.get('/:input/:page', function (req, res) {
  console.log('leads page called')
  const input = req.params.input.toLowerCase()
  var page = Number(req.params.page)
  page = (page * 10)

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE "%${input}%" ORDER BY number_of_employees DESC LIMIT ${page}, 10`, function(err, rows) {
    if (err) throw err
    results = rows
    res.send(results)
  })
})

// update single image
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  // dest: 'uploads/'
})
router.post('/update/main_image', upload.single('main_image'), (req, res) => {
  console.log(req.file)
  res.send(req.file)
})

// update single account
router.post('/update/:id', function (req, res) {
  console.log('update account called')
  const account_id = req.params.id
  const domain = req.body.domain,
    thumbnail_url = req.body.thumbnail_url,
    account_image_url_1 = req.body.account_image_url_1,
    account_name = req.body.account_name,
    company_short_description = req.body.company_short_description,
    products = req.body.products,
    website = req.body.website,
    phone = req.body.phone,
    established_date = req.body.established_date,
    mailing_country = req.body.mailing_country,
    mailing_state = req.body.mailing_state,
    mailing_city = req.body.mailing_city,
    mailing_postal_code = req.body.mailing_postal_code,
    mailing_street_address = req.body.mailing_street_address,
    mailing_street_address_2 = req.body.mailing_street_address_2,
    history = req.body.history

  mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_ACCOUNTS} SET 
  account_name = "${account_name}",
  domain = "${domain}",
  thumbnail_url = "${thumbnail_url}",
  account_image_url_1 = "${account_image_url_1}",
  company_short_description = "${company_short_description}",
  products = "${products}",
  website = "${website}",
  phone = "${phone}",
  established_date = "${established_date}",
  mailing_country = "${mailing_country}",
  mailing_state = "${mailing_state}",
  mailing_city = "${mailing_city}",
  mailing_postal_code = "${mailing_postal_code}",
  mailing_street_address = "${mailing_street_address}",
  mailing_street_address_2 = "${mailing_street_address_2}",
  history = "${history}" 
  WHERE account_id = ${account_id}`, (err) => {
    if(err) throw err
    res.status(200).json({msg: 'account updated'})
  })
})

module.exports = router