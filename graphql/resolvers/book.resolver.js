'use strict';

var bookHelper = require('../../database/helper/book.helper');

const {
    AuthenticationError,
    ForbiddenError,
    UserInputError,
    ApolloError
} = require('apollo-server-express');

var bookResolvers = {
    Query: {
        books: (parent, args) => {
            return bookHelper.getAll(args.genreId);
        },
        book: (parent, args) => {
            //throw new ApolloError('Error retrieving values from database', 500, { id: args.id});
            //throw new AuthenticationError('Autentication required');
            //throw new ForbiddenError('Insufficient privileges');
            //throw new UserInputError('Invalid parameter', {field:'id'});

            return bookHelper.getById(args.id);
        }
    },
    Mutation: {
        addBook: (parent, args) => {

            return bookHelper.addBook(
                args.name,
                args.genreId,
                args.authorIds
            );
        }
    }
};

module.exports = bookResolvers;
