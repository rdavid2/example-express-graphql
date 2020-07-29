'use strict';

const bookResolvers = require('./book.resolver');
const genreResolvers = require('./genre.resolver');
const authorResolvers = require('./author.resolver');

module.exports = {
    bookResolvers,
    genreResolvers,
    authorResolvers
};
