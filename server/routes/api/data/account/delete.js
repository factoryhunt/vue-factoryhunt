const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const CONFIG_MYSQL = require('../../../../config/mysql_config')

// DELETE /api/data/account/:account_id
router.delete('/:account_id', async (req, res) => {
  const id = req.params.account_id

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Account deleted success.'
    })
  }

  const onError = () => {
    res.status(403).json({
      result: false,
      msg: 'Removing account failed'
    })
  }

  try {
    await transferAccount(id)
    await removeAccount(id)
    onSuccess()
  } catch (err) {
    onError()
  }
})

module.exports = router

function transferAccount (id) {
  return new Promise((resolve, reject) => {
    mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_ACCOUNTS_DELETED} SELECT * FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE ${CONFIG_MYSQL.TABLE_ACCOUNTS}.account_id = ${id}`,
      (err) => {
        if (err) return reject(err)
        resolve()
      })
  })
}
function removeAccount (id) {
  return new Promise((resolve, reject) => {
    mysql.query(`DELETE FROM ${CONFIG_MYSQL.TABLE_ACCOUNTS} WHERE account_id = ${id}`,
      (err) => {
        if (err) return reject(err)
        resolve()
      })
  })
}