var mysql = require('mysql')

const host = 'fh-test-2017-10-14-09-25-2017-12-12-09-19.cfwdgkhtxdcy.us-west-1.rds.amazonaws.com'
const user = 'zerobaseinc'
const password = 'Ycombinator2017'
const database = 'fh'
const port = '3306'

// parameters
var connection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : database,
  port     : port,
  debug    : false
})

// methods
connection.connect(function(err){
  if(err) return console.log("Error connecting database ... \n\n" + err)

  console.log("Database is connected ... \n\n")
})

module.exports = connection