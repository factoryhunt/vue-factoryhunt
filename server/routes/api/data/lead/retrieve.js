const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const CONFIG_MYSQL = require('../../../../config/mysql_config')

// return all leads
// GET /api/data/lead/
router.get('/', (req, res) => {
  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS}`, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
})

// GET /api/data/lead/lead_id
router.get('/:lead_id', (req, res) => {
  const lead_id = parseInt(req.params.lead_id, 10)

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lead_id='${lead_id}'`, (err, rows) => {
    if (err) throw err
    const lead = rows[0]
    res.send(lead)
  })
})

// return filtered leads by company
// GET /api/data/lead/company/:input
router.get('/company/:input', (req, res) => {
  console.log('leads called')
  const input = req.params.input.toLowerCase()
  console.log(input)

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(company_english) LIKE '%${input}%'`, function(err, rows) {
    if (err) throw err
    leads = rows
    res.send(leads)
  })
})

// return filtered leads by products_english
router.get('/keyword/:keyword', async (req, res) => {
  const keyword = req.params.keyword.toLowerCase()
  console.log(keyword)

  const leads = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products_english) LIKE "%${keyword}%" ORDER BY number_of_employees DESC LIMIT 7`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }
  const count = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products_english) LIKE "%${keyword}%"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }
  const promise = await Promise.all([
    leads(),
    count()
  ])
  const result = {
    leads: promise[0],
    count: promise[1]
  }

  try {
    onSuccess(result, res)
  } catch (err) {
    onError(err, res)
  }
})

// return pagination lead
router.get('/keyword/:keyword/:page', (req, res) => {
  const keyword = req.params.keyword.toLowerCase()
  var page = Number(req.params.page)
  page = (page * 10)

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_LEADS} WHERE lower(products_english) LIKE "%${keyword}%" ORDER BY number_of_employees DESC LIMIT ${page}, 10`, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
})

module.exports = router

function onSuccess(result, res) {
  res.status(200).json({result})
}

function onError(err, res) {
  res.status(403).json({
    result: false,
    msg: err.msg,
    msg_kor: err.msg_kor
  })
}