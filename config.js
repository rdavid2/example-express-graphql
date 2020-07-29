'use strict';

const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
    throw new Error(`Can't load .env file`);
}

var config = {
    environment: process.env.NODE_ENV,

    port: parseInt(process.env.PORT, 10),

    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        schema: process.env.DB_SCHEMA,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },

    maxUploadSize: process.env.MAX_UPLOAD_SIZE
};


module.exports = config;
