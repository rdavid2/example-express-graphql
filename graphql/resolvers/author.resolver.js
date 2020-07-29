'use strict';

var authorDao = require('../../database/dao/author.dao');

var authorResolvers = {
    Query: {
        authors: () => {
            return authorDao.getAll();
        },
        author: (parent, args) => {
            return authorDao.getById(args.id);
        }
    },
    Mutation: {
        addAuthor: (parent, args) => {
            return authorDao.insert(
                args.name,
                args.authorId
            );
        }
    }
};

module.exports = authorResolvers;
