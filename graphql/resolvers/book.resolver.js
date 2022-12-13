'use strict';

import {ApolloServerErrorCode} from '@apollo/server/errors';
import {GraphQLError} from 'graphql';
import {BookHelper} from "../../database/helper/book.helper.js";

const bookHelper = new BookHelper();

export const bookResolvers = {
    Query: {
        books: (parent, args) => {
            return bookHelper.getAll(args.genreId);
        },
        book: (parent, args) => {

            // throw new GraphQLError('Invalid parameter', {
            //     extensions: {
            //         code: ApolloServerErrorCode.BAD_USER_INPUT,
            //         parameter: 'id',
            //         http: {
            //             status: 400
            //         }
            //     },
            // });

            // throw new GraphQLError('Error retrieving book from database', {
            //     extensions: {
            //         code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
            //         bookId: args.id,
            //         http: {
            //             status: 500
            //         }
            //     },
            // });

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
