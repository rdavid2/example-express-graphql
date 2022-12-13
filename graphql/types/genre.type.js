'use strict';

export const GenreType = `#graphql
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
