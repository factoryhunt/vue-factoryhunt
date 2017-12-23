const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const index = require('./routes/index')
const config = require('./config/config')
const port = process.env.PORT || 3000

// 패스포트 초기화 및 세션 사용
// require('./routes/api/auth/passport')(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "Range")
//   res.header("Access-Control-Allow-Headers", "Accept-Ranges, Content-Encoding, Content-Length, Content-Range")
//   next()
// })

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('jwt-token', config.secret)
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// connecting router
app.use('/', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => {
  console.log(`port ${port} is connected`)
})

module.exports = app