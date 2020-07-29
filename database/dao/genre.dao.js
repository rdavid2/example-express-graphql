'use strict';

var db = require('../../services/mysql');
var Genre = require('../entity/genre.entity');

var genreDao = {};

genreDao.insert = function (name) {
    return new Promise((resolve, reject) => {

        var sql = `
            INSERT INTO genre (name)
            VALUES (:name)
        `;

        var params = {
            name
        };

        db.query(sql, params, function (error, results) {
            if (error) {
                reject(error);
            }

            var genre = new Genre(
                results.insertId,
                name
            );

            resolve(genre);
        });

    });
};

genreDao.getAll = function (offset = 0, results = 100) {
    return new Promise((resolve, reject) => {

        var sql = `
            SELECT *
            FROM genre
            LIMIT :offset,:results`;

        var params = {
            offset,
            results
        };

        db.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            }

            var items = [];

            results.forEach(result => {

                var genre = new Genre(
                    result.id,
                    result.name
                );

                items.push(genre);

            });

            resolve(items);
        });

    });
};

module.exports = genreDao;
