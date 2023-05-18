const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();



const createConnection = async () => {
    const connection = `Server=${process.env.DB_HOST};Database=${process.env.DB_DATABASE};User Id=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};trustServerCertificate=${process.env.DB_TRUSTCERTIFICATE}`;

    try {
        return await sql.connect(connection);
    }
    catch (err) {
        console.log("Error connecting database:", err);
    }

}

module.exports = createConnection;
