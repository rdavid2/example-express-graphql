'use strict';

const {gql} = require('apollo-server-express');

var BookType = gql`
    type Book {
        id: ID!
        name: String!
        authors: [Author]!
        genreId: Int!
        genre: Genre
    }

     extend type Query { 
        books(genreId: Int): [Book] 
        book(id: Int): Book
     }
     
     extend type Mutation {
         addBook(
            name: String!
            genreId: Int!,
            authorIds: [Int]!
        ): Book
    } 
`;

module.exports = BookType;

