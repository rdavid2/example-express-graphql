'use strict';

import {BookDao} from "../dao/book.dao.js";
import {GenreDao} from "../dao/genre.dao.js";
import {AuthorDao} from "../dao/author.dao.js";

export class BookHelper {

    constructor() {
        this.bookDao = new BookDao();
        this.genreDao = new GenreDao();
        this.authorDao = new AuthorDao();
    }

    async addBook(nombre, genreId, authorIds) {
        var book = await bookDao.insert(nombre, genreId);

        authorIds.forEach(async function(authorId) {
            await this.bookDao.insertAuthor(book.id, authorId);
        });

        var books = [book];

        await this._addGenre([book]);
        await this._addAuthors([book]);

        return books[0];
    }

    async getAll(genreId) {
        var books = await this.bookDao.getAll(genreId);

        await this._addGenre(books);
        await this._addAuthors(books);

        return books;
    };

    async getById(genreId) {
        var book = await this.bookDao.getById(genreId);

        if (null !== book) {
            var books = [book];
            await this._addGenre(books);
            await this._addAuthors(books);

            return books[0];
        }

        return null;
    }

    async _addGenre(books) {
        var genres = await this.genreDao.getAll();

        books.forEach(book => {
            book.genre = genres.find(genre => {
                return book.genreId === genre.id;
            });
        });
    }

    async _addAuthors(books) {
        books.forEach(book => {
            book.authors = this.authorDao.getByBook(book.id);
        });
    }

}
