const jwt = require('jsonwebtoken')
const mysql = require('../../../models/mysql')
const crypto = require('crypto')
const secret = require('../../../config/config').secret

module.exports = (req, res) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password;

  mysql.query(`SELECT * FROM contacts_copy WHERE lower(contact_email) = "${email}"`,
    (err, users) => {
      const user = users[0];

      if (err) { throw err }

      // checking user existing
      if (!user) return res.status(403).json({msg: 'email is not exist'})

      // DB에 패스워드 길이가 50글자로 제한되어 있었음.
      crypto.pbkdf2(password, user.password_salt, 100000, 64, 'sha512', function (err, key) {
        if (err) return res.send(err);
        const result = key.toString('base64') === user.password;

        // password is incorrect
        if (!result) return res.status(403).json({msg: 'password is incorrect'})

        // authorization
        //jwt Usage: jwt.sign(payload, secret, options, [callback])
        const options = {
          expiresIn: '1d', // expired in 24 hours
          issuer: 'factoryhunt.com',
          subject: 'user_id'
        }
        jwt.sign({ id: user.account_id }, secret, options,
          (err, token) => {
            if (err) return err

            res.cookie('nekot', token, {
              maxAge: 1000 * 60 * 60 * 24 // expired in 1 day
              // httpOnly: true,
              // secure: true
            })
            // success
            res.status(200).json({
              user: user,
              token: token
            })
          })
      });
    })
}