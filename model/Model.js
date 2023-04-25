const sql = require('mssql');



const createConnection = async () => {
  const connection = `Server=${process.env.DB_HOST};
                        Database=${process.env.DB_DATABASE};
                        User Id=${process.env.DB_USER};
                        Password=${process.env.DB_PASSWORD};
                        trustServerCertificate=${process.env.DB_TRUSTCERTIFICATE}`;

  try {
    return await sql.connect(connection);
  }
  catch (err) {
    console.log("Error connecting database:", err);
  }

}


/**
 * @description base model for all model
 * @property {db} this can be used to access the database
 */

class Model {
  //mysql config
  db = createConnection();

  //get all data from a table in filter by a field and order by field
  getDreList = async (table, field, value, order_field, callback) => {
      const sql = `SELECT * from ??`;
      this.db.query(sql, [table, field, value, order_field], callback);
  }
}

module.exports = Model
