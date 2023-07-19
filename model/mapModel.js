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
const sql = require('mssql');
const xlsx = require('xlsx');
const createConnection = require('./connection');

const filePath = "Z:/Vimlesh/DRE Project/DRE_Statewide_List.xlsx";
const sheetName = "Sheet1";
const tableName = "DRE_DETAILS";

const columnMapping = {
    "dreOfficer": "dreOfficer",
    "Last Name": "lastName",
    "First Name": "firstName",
    lat: "lat",
    lon: "lon",
    "E-mail Address": "email",
    "1st Preferred Contact": "phoneNumber",
    "2nd Preferred Contact": "alternateNumber",
    "Responding Areas": "respondingArea",
    "Estimated City": "mapArea",
    "Agency": "agency",
    "Agency Type": "agencyType"
    // Add more column mappings as needed
};

const createTableIfNotExists = async () => {
    try {
        const connString = createConnection();
        await sql.connect(connString);

        const request = new sql.Request();
        const tableExistsQuery = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`;
        const { recordset } = await request.query(tableExistsQuery);

        if (recordset.length === 0) {
            const createTableQuery = `CREATE TABLE ${tableName} (Id INT IDENTITY(1,1) PRIMARY KEY, ${Object.entries(
                columnMapping
            )
                .map(([header, column]) =>
                    column === "dreOfficer"
                        ? `[${column}] AS ([${columnMapping["First Name"]}]+ ' ' +[${columnMapping["Last Name"]}])`
                        : column === "lat" || column === "lon"
                            ? `[${column}] DECIMAL(9, 6)`
                            : `[${column}] NVARCHAR(MAX)`
                )
                .join(", ")})`;
            await request.query(createTableQuery);
            console.log(`Table ${tableName} created successfully!`);
        } else {
            console.log(`Table ${tableName} already exists!`);
        }
    } catch (error) {
        console.error("Error creating table:", error);
    } finally {
        sql.close();
    }
};

const convertExcelDataToKeyValuePairs = (worksheet) => {
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = jsonData[0];
    const rows = jsonData.slice(1);

    const keyValues = rows.map((row) => {
        const keyValue = {};
        headers.forEach((header, index) => {
            const columnName = columnMapping[header];
            if (columnName) {
                keyValue[columnName] = header === "dreOfficer" ? null : row[index];
            }
        });
        return keyValue;
    });

    return keyValues;
};

const insertDataIntoDatabase = async (data) => {
    try {
        const connString = createConnection();
        await sql.connect(connString);

        const transaction = new sql.Transaction();
        await transaction.begin();

        const request = new sql.Request(transaction);
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const columns = Object.keys(item).join(", ");
            const values = Object.values(item);

            const placeholders = values.map((_, index) => `@param${i}_${index + 1}`).join(", ");
            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

            values.forEach((value, index) => {
                const columnName = Object.keys(item)[index];
                if (columnName === 'lat' || columnName === 'lon') {
                    // Validate and convert lat/lon values to decimal
                    const decimalValue = parseFloat(value);
                    request.input(`param${i}_${index + 1}`, sql.Decimal(9, 6), decimalValue);
                } else {
                    request.input(`param${i}_${index + 1}`, value);
                }
            });

            await request.query(query);
        }

        await transaction.commit();
        console.log("Data inserted successfully!");
    } catch (error) {
        console.error("Error inserting data into the database:", error);
    } finally {
        sql.close();
    }
};

const getDreData = async () => {
    try {
        const connString = createConnection();
        await sql.connect(connString);
        const query = `SELECT * from ${tableName}`;
        const result = await sql.query(query);
        return result.recordsets[0];
    } catch (error) {
        console.error("Error fetching DRE data:", error);
    } finally {
        sql.close();
    }
};

const updateDreList = async () => {
    try {
        await createTableIfNotExists();

        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName];
        const data = convertExcelDataToKeyValuePairs(worksheet);

        await insertDataIntoDatabase(data);
        return data;
    } catch (err) {
        console.error(err);
        return err;
    }
};

module.exports.dreListModel = async () => {
    return await getDreData();
};

module.exports.readAndUpdateDreListModel = async () => {
    return await updateDreList();
};