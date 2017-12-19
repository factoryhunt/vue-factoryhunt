const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const CONFIG_MYSQL = require('../../../../config/mysql_config')

// GET /api/data/contact/:contact_id
// return an account by using id
router.get('/:id', (req, res) => {
  const contact_id = req.params.id

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE contact_id='${contact_id}'`,
    (err, rows) => {
      if (err) throw err
      const contact = rows[0]
      res.send(contact)
    });
});

module.exports = router