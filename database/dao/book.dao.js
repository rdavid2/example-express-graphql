'use strict';

import {Book} from "../entity/book.entity.js";
import {connection} from '../../services/mysql.js';

export class BookDao {

    async insert(name, genreId) {
        return new Promise((resolve, reject) => {

            var sql = `
                INSERT INTO book (
                    name,
                    genre_id
                ) VALUES (
                    :name,
                    :genreId
                )
            `;

            var params = {
                name,
                genreId
            };

            connection.query(sql, params, (error, results) => {
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
    }

    async insertAuthor(bookId, authorId) {
        return new Promise((resolve, reject) => {

            const sql = `
                INSERT INTO book_author (
                     book_id,
                     author_id
                ) VALUES (
                    :bookId,
                    :authorId
                )
            `;

            var params = {
                bookId,
                authorId
            };

            connection.query(sql, params, (error, results) => {
                if (error) {
                    reject(error);
                }

                resolve();
            });

        });
    }

    async getAll(genreId = null, offset = 0, results = 100) {
        return new Promise((resolve, reject) => {

            const where = [];
            if (genreId) {
                where.push("genre_id = :genreId")
            }

            const sql = `
                SELECT *
                FROM book ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
                LIMIT :offset,:results
            `;

            var params = {
                offset,
                results
            };

            if (genreId) {
                params.genreId = genreId;
            }

            connection.query(sql, params, function(error, results) {
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
    }

    async getById(id) {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM book
               WHERE id = :id
            `;

            var params = {
                id
            };

            connection.query(sql, params, function(error, results) {
                if (error) {
                    return reject(error);
                }

                if (1 === results.length) {
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
    }
}
