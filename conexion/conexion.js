const sql = require('mssql');
const { dbconfig} = require('./credentials');

const SqlConnection = new sql.ConnectionPool(dbconfig)
    .connect()
    .then(pool => {
        console.log(`Connected to database: ${dbconfig.database}`);

        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad config: ', err));

module.exports = {
    SqlConnection,
    sql
}