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


const sql = require('mssql');
const createConnection = require('./connection');

const tableName = "CrowdSourcing";

// Function to save user data to the database
const saveDataModel = async ({locationDetails, otherOption, selectedOption, description}) => {
    try {
        const connString = createConnection();
        await sql.connect(connString);

        // Check if the table exists
        const tableExistsQuery = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`;
        const { recordset } = await new sql.Request().query(tableExistsQuery);

        if (recordset.length === 0) {
            console.log(`Table ${tableName} does not exist. Creating the table...`);
            await createTableIfNotExists();
        }

        const request = new sql.Request();

        const query = `
        INSERT INTO ${tableName} (locationDetails, otherOption, selectedOption, description)
        VALUES (@locationDetails, @otherOption, @selectedOption, @description)
      `;

        request.input('locationDetails', locationDetails);
        request.input('selectedOption', selectedOption);
        request.input('description', description);
        request.input('otherOption', otherOption);

        const result = await request.query(query);
        console.log('Data saved successfully');
        return result;
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    } finally {
        sql.close();
    }
};

module.exports = {
    saveDataModel,
};