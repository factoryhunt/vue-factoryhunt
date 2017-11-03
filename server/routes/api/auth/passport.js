var passport = require('passport')
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('../../../models/mysql');
var flash = require('connect-flash');
var crypto = require('crypto');

module.exports = (app) => {
  console.log('passport.js initializing');

  app.use(session({
    secret: 'io.zerobaseinc.www', //주기적으로 바꾸는 게 좋다
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 5 // 쿠키 5분
    }
    // store: new redisStore() // 세션을 저장할 곳이 필요함. 안하면 세션 정보가 페이지마다 초기화되서 계속 로그인 해야하는 상태가 발생함.
  })); // 세션 활성화
  app.use(flash());
  app.use(passport.initialize()); // passport 구동
  app.use(passport.session()); // 세션 연결

  // strategy success
  passport.serializeUser(function (user, done) {
    //strategy 에서 done()의 파라미터로 2번째로 넣은 게 전부 deserializeUser의 첫 번째 파라미터로 들어옴
    console.log('serializeUser() called');
    // console.log('msg: ', user.msg);
    // console.log('result: ', user.result);
    done(null, user.contact_id)
  });

  // 다시 요청할 때
  passport.deserializeUser(function (id, done) {
    console.log('deserializeUser() called');
    mysql.query('SELECT * FROM contacts_copy WHERE contact_id = ?', id, function(err, rows) {
      if (err) return done(err);

      const user = rows[0];
      done(null, user);
    })
  });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: true,
      passReqToCallback: true
    },
    function(req, email, password, done) {

      console.log('passport.use() called');

      mysql.query('SELECT * FROM contacts_copy WHERE lower(contact_email) = ?', email, function(err, rows) {
        var user = rows[0];

        // fail
        if (err) return done(err);

        // email is not exist in database
        if (!user) {
          return done(false, { msg: 'email is not exist', result: false })
        }

        // DB에 패스워드 길이가 50글자로 제한되어 있었음.
        crypto.pbkdf2(password, user.password_salt, 100000, 64, 'sha512', function (err, key) {
          if (err) return res.send(err);
          const result = key.toString('base64') === user.password;

          // password is incorrect
          if (!result) {
            return done(false, {msg: 'password incorrect', result: false});
          }

          console.log('passport.use() success.');
          // success
          return done(null, user)
        });
      })
    }
  ));
}
