const sql = require('mssql');
const config = require('../config/default.json')
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }
  


function connection (){
    let connection = `Server=${process.env.DB_HOST};
                        Database=${process.env.DB_DATABASE};
                        User Id=${process.env.DB_USER};
                        Password=${process.env.DB_PASSWORD};
                        trustServerCertificate=${process.env.DB_TRUSTCERTIFICATE}`

    return connection
    
}

module.exports = connection
