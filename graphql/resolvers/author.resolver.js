'use strict';

import {AuthorDao} from "../../database/dao/author.dao.js";

const authorDao = new AuthorDao();

export const authorResolvers = {
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
