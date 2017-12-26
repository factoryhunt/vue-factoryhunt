var express = require('express')
var path = require('path')
var router = express.Router()

router.use('/api', require('./api'))

router.get('/logo.png', function(req, res) {
  const options = {
    root: __dirname + '/../public/static/',
    headers: {
      'Content-Type': ' image/png'
    }
  }
  res.sendFile('logo_orange_small.png', options)
})

router.get('/robots.txt', function(req, res) {
  const options = {
    root: __dirname + '/../public/static/',
    headers: {
      'Content-Type': 'text/plaincharset=UTF-8'
    }
  }
  res.sendFile('robots.txt', options)
})

router.get('*', (req, res) => {
  console.log('*')
  // if (req.headers.cookie) {
  //   console.log('cookie already have had.')
  //   req.headers.cookie.split('').map(function(element){
  //     element = element.split('=')
  //     return {
  //       key: element[0],
  //       value: element[1]
  //     }
  //   })
  // } else {
  //   // Response header의 Set-Cookie 속성을 사용하여 쿠키 생성
  //   res.writeHead(200, {
  //     'Content-Type': 'text/html',
  //     'Set-Cookie': ['id=ledgku', 'pw=cookieandsession']
  //   })
  //   console.log('cookie created')
  // }
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = router