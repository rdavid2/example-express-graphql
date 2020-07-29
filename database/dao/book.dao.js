'use strict';

var db = require('../../services/mysql');
var Book = require('../entity/book.entity');

var bookDao = {};

bookDao.insert = function (name, genreId) {
    return new Promise((resolve, reject) => {

        var sql = `
            INSERT INTO book (
                name, 
                genre_id
            )
            VALUES (
                :name, 
                :genreId
            )
        `;

        var params = {
            name,
            genreId
        };

        db.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            }

            var book = new Book(
                results.insertId,
                name,
                genreId
            );

            resolve(book);
        });

    });
};

bookDao.insertAuthor = function (bookId, authorId) {
    return new Promise((resolve, reject) => {

        var sql = `
            INSERT INTO book_author (
                book_id, 
                author_id
            )
            VALUES (
                :bookId, 
                :authorId
            )
        `;

        var params = {
            bookId,
            authorId
        };

        db.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            }

            resolve();
        });

    });
};

bookDao.getAll = function (genreId = null, offset = 0, results = 100) {
    return new Promise((resolve, reject) => {

        const where = [];
        if (genreId) {
           where.push("genre_id = :genreId")
        }

        var sql = `
            SELECT *
            FROM book
            ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
            LIMIT :offset,:results`;

        var params = {
            offset,
            results
        };

        if (genreId) {
            params.genreId = genreId;
        }

        db.query(sql, params, function(error, results) {
            if (error) {
                return reject(error);
            }

            var items = [];

            results.forEach(result => {

                var book = new Book(
                    result.id,
                    result.name,
                    result.genre_id
                );

                items.push(book);

            });

            return resolve(items);
        });

    });
};

bookDao.getById = function (id) {
    return new Promise((resolve, reject) => {

        var sql = `SELECT *
                   FROM book
                   WHERE id=:id`;

        var params = {
            id
        };

        db.query(sql, params, function(error, results) {
            if (error) {
                return reject(error);
            }

            if (1=== results.length) {
                var book = new Book(
                    results[0].id,
                    results[0].name,
                    results[0].genre_id
                );

                return resolve(book);
            }

            return resolve(null);

        });

    });
};



module.exports = bookDao;
