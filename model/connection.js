const sql = require('mssql');
const config = require('../config.json');



const createConnection = async () => {
    const connection = `Server=${config.server};Database=${config.database};User Id=${config.user};Password=${config.password};trustServerCertificate=${config.trustCertificate}`;

    try {
        return await sql.connect(connection);
    }
    catch (err) {
        console.log("Error connecting database:", err);
    }

}

module.exports = createConnection;
