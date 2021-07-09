// require('dotenv').config();

const config = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 8080
};

module.exports = config;