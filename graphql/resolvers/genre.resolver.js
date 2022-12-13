'use strict';

import {GenreDao} from "../../database/dao/genre.dao.js";

const genreDao = new GenreDao();

export const genreResolvers = {
    Query: {
        genres: async () => {
            return genreDao.getAll();
        }
    },
    Mutation: {
        addGenre: async (parent, args) => {
            return genreDao.insert(
                args.name,
                args.genreId
            );
        }
    }
};
