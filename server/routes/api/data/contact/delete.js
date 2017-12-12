const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const CONFIG_MYSQL = require('../../../../config/mysql_config')

// DELETE /api/data/product/:contact_id
router.delete('/:contact_id', (req, res) => {
  const id = req.params.contact_id

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Contact deleted success.'
    })
  }

  const onError = () => {
    res.status(403).json({
      result: false,
      msg: 'Removing Contact failed'
    })
  }

  transferContact(id)
    .then(removeContact(id))
    .then(onSuccess)
    .catch(onError)
})

module.exports = router

function transferContact (id) {
  return new Promise((resolve, reject) => {
    mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_CONTACTS_DELETED} SELECT * FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE ${CONFIG_MYSQL.TABLE_CONTACTS}.contact_id = ${id}`,
      (err) => {
        if (err) return reject(err)
        resolve()
      })
  })
}
function removeContact (id) {
  return new Promise((resolve, reject) => {
    mysql.query(`DELETE FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE contact_id = ${id}`,
      (err) => {
        if (err) return reject(err)
        resolve()
      })
  })
}