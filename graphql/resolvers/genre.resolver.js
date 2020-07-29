'use strict';

var genreDao = require('../../database/dao/genre.dao');

var genreResolvers = {
    Query: {
        genres: () => {

            var genres = genreDao.getAll();

            return genres;
        }
    },
    Mutation: {
        addGenre: (parent, args) => {
            return genreDao.insert(
                args.name,
                args.genreId
            );
        }
    }
};

module.exports = genreResolvers;
