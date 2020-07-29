'use strict';

var bookDao = require('../dao/book.dao');
var genreDao = require('../dao/genre.dao');
var authorDao = require('../dao/author.dao');

var bookHelper = {};

bookHelper.addBook = async function (nombre, genreId, authorIds) {
    var book = await bookDao.insert(nombre, genreId);
    console.log(authorIds, book.id);
    authorIds.forEach(async function(authorId){
       await bookDao.insertAuthor(book.id, authorId);
    });

    var books=[book];

    await addGenre([book]);
    await addAuthors([book]);

    return books[0];
};

bookHelper.getAll = async function (genreId) {
    var books = await bookDao.getAll(genreId);

    await addGenre(books);
    await addAuthors(books);

    return books;
};

bookHelper.getById = async function (genreId) {
    var book = await bookDao.getById(genreId);

    if (null !== book) {
        var books = [book];
        await addGenre(books);
        await addAuthors(books);

        return books[0];
    }

    return null;
};

var addGenre = async function (books) {
    var genres = await genreDao.getAll();

    books.forEach(book => {
        var bookGenre = genres.find(genre => {
            return book.genreId === genre.id;
        });

        book.genre = bookGenre;
    });
};


var addAuthors = async function(books) {
    books.forEach(book => {
        book.authors = authorDao.getByBook(book.id);
    });
};

module.exports = bookHelper;
