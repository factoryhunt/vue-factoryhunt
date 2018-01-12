const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const CONFIG_MYSQL = require('../../../../config/mysql_config')

// Retrieve All Products filtered by account_id
// GET /api/data/product/account_id/:id
router.get('/account_id/:id', (req, res) => {
  const id = req.params.id
  retrieveAllProductsByAccountId(id)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch(() => {
      res.status(404).json({
        result: false,
        msg: 'Getting all products failed'
      })
    })
})
// Retrieve single product filtered by product_id
router.get('/product_id/:id', (req, res) => {
  const id = req.params.id
  retrieveSingleProductByProductId(id)
    .then((result) => {
      res.status(200).send(result[0])
    })
    .catch(() => {
      res.status(404).json({
        result: false,
        msg: 'Getting single product failed'
      })
    })
})
// Retrieve single product filtered by product_domain
router.get('/domain/:account/:domain', async (req, res) => {
  const account = req.params.account
  const domain = req.params.domain

  const getAccount = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE domain = '${account}'`,
        (err, rows) => {
          if (err) return reject(err)
          resolve(rows[0])
        })
    })
  }

  const getProduct = (account_id) => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE account_id = ${account_id} AND product_domain = '${domain}'`,
        (err, rows) => {
          if (err) return reject(err)
          resolve(rows[0])
        })
    })
  }

  try {
    const account = await getAccount()
    const product = await getProduct(account.account_id)
    const result = {
      account,
      product
    }
    res.status(200).json(result)
  } catch (err) {
    res.status(403).json({
      result: false,
      msg: 'Getting single product failed'
    })
  }
})
// return filtered products by product_name
router.get('/count/:keyword', (req, res) => {
  const keyword = req.params.keyword.toLowerCase()
  mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE lower(product_name) LIKE '%${keyword}%'`, (err, rows) => {
    if (err) throw err
    count = rows[0]
    res.send(count)
  })
})
router.get('/keyword/:keyword', async (req, res) => {
  const keyword = req.params.keyword.toLowerCase()
  const products = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE lower(product_name) LIKE "%${keyword}%" AND product_status = "approved" LIMIT 8`, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }
  const count = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT count(*) as count FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE lower(product_name) LIKE '%${keyword}%' AND product_status = "approved"`, (err, rows) => {
        if (err) reject(err)
        resolve(rows[0].count)
      })
    })
  }
  const promise = await Promise.all([
    products(),
    count()
  ])
  const result = {
    products: promise[0],
    count: promise[1]
  }
  try {
    onSuccess(result, res)
  } catch (err) {
    onError(err, res)
  }
})

module.exports = router

// scoped functions
function retrieveAllProductsByAccountId (id) {
  return new Promise((resolve, reject) => {
    mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE account_id = ${id}`,
      (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      })
  })
}
function retrieveSingleProductByProductId (id) {
  return new Promise((resolve, reject) => {
    mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE product_id='${id}'`,
      (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      })
  })
}

function onSuccess(result, res) {
  res.status(200).json({
    result
  })
}

function onError(err, res) {
  res.status(403).json({
    result: false,
    msg: err.msg,
    msg_kor: err.msg_kor
  })
}