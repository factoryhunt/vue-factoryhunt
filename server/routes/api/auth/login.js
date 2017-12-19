const jwt = require('jsonwebtoken')
const mysql = require('../../../models/mysql')
const crypto = require('crypto')
const secret = require('../../../config/config').secret
const CONFIG_MYSQL = require('../../../config/mysql_config')

module.exports = (req, res) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE lower(contact_email) = "${email}"`,
    (err, users) => {
      if (err) throw err

      const user = users[0]

      // checking user existing
      // both expression are accepted
      // if (users.length < 1) return res.status(403).json({msg: 'email is not exist'})
      if (!user) return res.status(403).json({result: false, msg: 'email is not exist', msg_kor: '존재하지 않는 이메일입니다.'})

      // DB에 패스워드 길이가 50글자로 제한되어 있었음.
      crypto.pbkdf2(password, user.password_salt, 100000, 64, 'sha512', function (err, key) {
        if (err) return res.send(err)
        const result = key.toString('base64') === user.password

        // password is incorrect
        if (!result) return res.status(403).json({result: false, msg: 'password is incorrect', msg_kor: '비밀번호가 일치하지 않습니다.'})

        // authorization
        //jwt Usage: jwt.sign(payload, secret, options, [callback])
        const payload = {
          id: user.account_id,
          cid: user.contact_id
        }
        const options = {
          expiresIn: '1d', // expired in 24 hours
          issuer: 'factoryhunt.com',
          subject: 'user_id'
        }
        jwt.sign(payload, secret, options,
          (err, token) => {
            if (err) return err

            // res.cookie('nekot', token, {
            //   maxAge: 1000 * 60 * 60 // expired in 1 hour
            //   // httpOnly: true,
            //   // secure: true
            // })
            // success
            res.status(200).json({
              user: user,
              token: token
            })
          })
      });
    })
}
