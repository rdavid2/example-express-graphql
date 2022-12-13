'use strict';

import {Author} from "../entity/author.entity.js";
import {connection} from '../../services/mysql.js';

export class AuthorDao {

    insert(name) {
        return new Promise((resolve, reject) => {

            const sql = `
                INSERT INTO author (name)
                VALUES (:name)
            `;

            var params = {
                name
            };

            connection.query(sql, params, (error, results) => {
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
    }

    getAll(offset = 0, results = 100) {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM author
                LIMIT :offset,:results
            `;

            var params = {
                offset,
                results
            };

            connection.query(sql, params, (error, results) => {
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
    }

    async getByBook(bookId) {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM book_author
                INNER JOIN author ON
                    author.id = book_author.author_id
               WHERE 
                    book_author.book_id = :bookId
            `;

            var params = {
                bookId
            };

            connection.query(sql, params, (error, results) => {
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
    }

    async getById(id) {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM author
                WHERE 
                    id = :id
            `;

            var params = {
                id
            };

            connection.query(sql, params, function(error, results) {
                if (error) {
                    return reject(error);
                }

                if (1 === results.length) {
                    var author = new Author(
                        results[0].id,
                        results[0].name,
                    );

                    return resolve(author);
                }

                return resolve(null);

            });

        });
    }
}
