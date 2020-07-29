'use strict';

var mysql = require('mysql');
const config = require('../config');

var connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.schema,
    timezone: 'utc'
});

connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

connection.connect(function (err) {
    if (err) {
        throw new Error(`Can't connect to MySQL`);
    }

    console.log('MYSQL: CONNECT');

});

module.exports = connection;
