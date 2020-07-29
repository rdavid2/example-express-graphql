'use strict';

const {gql} = require('apollo-server-express');

var GenreType = gql`
    type Genre {
        id: ID!
        name: String!
    }
    
    extend type Query { 
        genres: [Genre] 
     }
     
    extend type Mutation {
         addGenre(
            name: String!
        ): Genre
    }
    
`;

module.exports = GenreType;
