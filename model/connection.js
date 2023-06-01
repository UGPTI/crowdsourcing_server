const sql = require('mssql');
const config = require('../config.json');



const createConnection = async () => {
    const connection = `Server=${config.sqlConn.server};Database=${config.sqlConn.database};User Id=${config.sqlConn.user};Password=${config.sqlConn.password};trustServerCertificate=${config.sqlConn.trustCertificate}`;

    try {
        return await sql.connect(connection);
    }
    catch (err) {
        console.log("Error connecting database:", err);
    }

}

module.exports = createConnection;
