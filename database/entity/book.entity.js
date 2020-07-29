'use strict';

class Book {
    constructor(
        id,
        name,
        genreId
    ) {
        this.id = id;
        this.name = name;
        this.genreId = genreId;
    }
}

module.exports = Book;
