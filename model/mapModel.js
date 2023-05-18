/***************************************************************************************
 *  Purpose         : Defines a Model for Map .
 *
 *  @description
 *
 *  @file           : mapModel.js
 *  @overview       : Creates a connection and queries database for map.
 *  @author         : Vimlesh Kumar
 *  @version        : 1.0
 *  @since          : 04-24-2023
 *
 *****************************************************************************************/
/**
* @description Dependencies require to be installed before the execution of this file.
*/


const dotenv = require('dotenv');
dotenv.config();
const sql = require('mssql');
const createConnection = require('./connection');

const getDreData = async () => {
    const connString = createConnection();
    const query = `            
    SELECT * from Dre_Details`;
    await sql.connect(connString);
    const result = await sql.query(query);
    return result.recordsets[0];
}

module.exports.dreListModel = async () => {
    return await getDreData();
}

