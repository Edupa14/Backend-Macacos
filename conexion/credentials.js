// Paquete para inicializar las variables de entorno en los archivos .env
require('dotenv').config();

const {
    CREDENTIALS_DB_SERVER,
    CREDENTIALS_DB_USER,
    CREDENTIALS_DB_PASSWORD,
    CREDENTIALS_DB_DATABASE
} = process.env;

const dbconfig = {
    server: CREDENTIALS_DB_SERVER,
    user: CREDENTIALS_DB_USER,
    password: CREDENTIALS_DB_PASSWORD,
    database: CREDENTIALS_DB_DATABASE,
    port: 1433,
    connectionTimeout: 240000,
    requestTimeout: 120000,
    options: {
        encrypt: true,
        enableArithAbort: true
    },
    pool: {
        max: 30,
        min: 0,
        idleTimeoutMillis: 600000,
        acquireTimeoutMillis: 600000
    },
};

module.exports = { 
    dbconfig
}