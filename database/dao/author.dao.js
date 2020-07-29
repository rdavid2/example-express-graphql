'use strict';

var db = require('../../services/mysql');
var Author = require('../entity/author.entity');

var authorDao = {};

authorDao.insert = function (name) {
    return new Promise((resolve, reject) => {

        var sql = `
            INSERT INTO author (name)
            VALUES (:name)
        `;

        var params = {
            name
        };

        db.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            }

            var author = new Author(
                results.insertId,
                name
            );

            resolve(author);
        });

    });
};

authorDao.getAll = function (offset = 0, results = 100) {
    return new Promise((resolve, reject) => {

        var sql = `SELECT * FROM author LIMIT :offset,:results`;

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

                var author = new Author(
                    result.id,
                    result.name
                );

                items.push(author);

            });

            resolve(items);
        });

    });
};

authorDao.getByBook = function (bookId) {
    return new Promise((resolve, reject) => {

        var sql = `SELECT * 
                   FROM book_author 
                   INNER JOIN author ON 
                       author.id = book_author.author_id
                   WHERE 
                       book_author.book_id= :bookId `;

        var params = {
            bookId
        };

        db.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            }

            var items = [];

            results.forEach(result => {

                var author = new Author(
                    result.id,
                    result.name
                );

                items.push(author);

            });

            resolve(items);
        });

    });
};

authorDao.getById = function (id) {
    return new Promise((resolve, reject) => {

        var sql = `SELECT * FROM author WHERE id=:id`;

        var params = {
            id
        };

        db.query(sql, params, function(error, results) {
            if (error) {
                return reject(error);
            }

            if (1=== results.length) {
                var author = new Author(
                    results[0].id,
                    results[0].name,
                );

                return resolve(author);
            }

            return resolve(null);

        });

    });
};

module.exports = authorDao;
