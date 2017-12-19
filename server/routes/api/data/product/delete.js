const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const CONFIG_MYSQL = require('../../../../config/mysql_config')

// DELETE /api/data/product/:product_id
router.delete('/:product_id', async (req, res) => {
  const id = req.params.product_id

  const transferProduct = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_PRODUCTS_DELETED} SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE ${CONFIG_MYSQL.TABLE_PRODUCTS}.product_id = ${id}`,
        (err) => {
          if (err) return reject({
            msg: 'Failed. Please try again.',
            msg_kor: '제품 삭제 실패. 다시 시도해주세요.'
          })
          resolve()
        })
    })
  }

  const removeProduct = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`DELETE FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE product_id = ${id}`,
        (err) => {
          if (err) return reject({
            msg: 'Failed. Please try again.',
            msg_kor: '제품 삭제 실패. 다시 시도해주세요.'
          })
          resolve()
        })
    })
  }

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Product deleted success.',
      msg_kor: '제품 삭제 성공.'
    })
  }

  const onError = (err) => {
    res.status(403).json({
      result: false,
      msg: err.msg,
      msg_kor: err.msg_kor
    })
  }

  try {
    console.log(1)
    await transferProduct()
    console.log(2)
    await removeProduct()
    console.log(3)
    onSuccess()
  } catch (err) {
    onError(err)
  }
})

// DELETE /api/data/product/all/:account_id
router.delete('/all/:account_id', (req, res) => {
  const account_id = req.params.account_id

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'All products deleted success.'
    })
  }

  const onError = () => {
    res.status(403).json({
      result: false,
      msg: 'Removing products failed'
    })
  }

  transferAllProducts(account_id)
    .then(removeAllProducts(account_id))
    .then(onSuccess)
    .catch(onError)
})

module.exports = router

function transferAllProducts (account_id) {
  return new Promise((resolve, reject) => {
    mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_PRODUCTS_DELETED} SELECT * FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE ${CONFIG_MYSQL.TABLE_PRODUCTS}.account_id = ${account_id}`,
      (err) => {
        if (err) return reject(err)
        resolve()
      })
  })
}
function removeAllProducts (account_id) {
  return new Promise((resolve, reject) => {
    mysql.query(`DELETE FROM ${CONFIG_MYSQL.TABLE_PRODUCTS} WHERE account_id = ${id}`,
      (err) => {
        if (err) return reject(err)
        resolve()
      })
  })
}