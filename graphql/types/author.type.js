'use strict';

export const AuthorType = `#graphql
    type Author {
        id: ID!
        name: String!
    }
    
    extend type Query { 
        authors: [Author] 
        author(id: Int): Author  
     }
     
    extend type Mutation {
         addAuthor(
            name: String!
        ): Author
    }
`;
