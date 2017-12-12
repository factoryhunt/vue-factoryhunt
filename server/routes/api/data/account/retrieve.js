const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const CONFIG_MYSQL = require('../../../../config/mysql_config')

/* GET SINGLE ACCOUNT DATA */

// GET /api/data/account/:account_id
// Retrieve single account filtered by product_id
router.get('/:account_id', (req, res) => {
  const id = req.params.account_id

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE account_id = '${id}'`,
    (err, rows) => {
    if (err) throw err

    res.send(rows[0])
  })
})
// GET /api/data/account/domain/:domain
// Retrieve single account filtered by product_id
router.get('/domain/:domain', (req, res) => {
  const domain = req.params.domain

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE domain='${domain}'`,
    (err, rows) => {
    if (err) throw err
    const account = rows[0]
    res.send(rows[0])
  })
})

// return filtered accounts by products_english
router.get('/count/:keyword', (req, res) => {
  const keyword = req.params.keyword.toLowerCase()
  mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE '%${keyword}%'`, (err, rows) => {
    if (err) throw err
    res.send(rows[0])
  })
})
router.get('/keyword/:keyword', async (req, res) => {
  const keyword = req.params.keyword.toLowerCase()
  const accounts = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE "%${keyword}%" LIMIT 8`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }
  const count = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE lower(products_english) LIKE '%${keyword}%'`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }
  const promise = await Promise.all([
    accounts(),
    count()
  ])
  const result = {
    accounts: promise[0],
    count: promise[1]
  }
  try {
    onSuccess(result, res)
  } catch (err) {
    onError(err, res)
  }
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