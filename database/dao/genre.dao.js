'use strict';

import {Genre} from "../entity/genre.entity.js";
import {connection} from '../../services/mysql.js';

export class GenreDao {

    async insert(name) {
        return new Promise((resolve, reject) => {

            const sql = `
                INSERT INTO genre (name)
                VALUES (:name)
            `;

            var params = {
                name
            };

            connection.query(sql, params, function(error, results) {
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
    }

    async getAll(offset = 0, results = 100) {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM genre
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

                    var genre = new Genre(
                        result.id,
                        result.name
                    );

                    items.push(genre);

                });

                resolve(items);
            });

        });
    }
}
