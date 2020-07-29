'use strict';

const {gql} = require('apollo-server-express');

var AuthorType = gql`
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

module.exports = AuthorType;
