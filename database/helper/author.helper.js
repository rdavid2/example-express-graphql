'use strict';

import {AuthorDao} from "../dao/author.dao.js";

export class authorHelper {

    constructor() {
        this.authorDao = new AuthorDao();
    }

    async addAuthor(nombre, genreId) {
        return await this.authorDao.insert(nombre, genreId);
    }

    async getAll(genreId) {
        return await this.authorDao.getAll(genreId);
    }

    async getById(genreId) {
        return await this.authorDao.getById(genreId);
    }
}
