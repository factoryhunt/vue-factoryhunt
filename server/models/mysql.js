var mysql = require('mysql')
const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT
}

const host = MYSQL_HOST || 'YOUR_HOST'
const user = MYSQL_USER || 'YOUR_USER'
const password = MYSQL_PASSWORD || 'YOUR_PASSWORD'
const database = MYSQL_DATABASE || 'YOUR_DATABASE'
const port = MYSQL_PORT || '3306'

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