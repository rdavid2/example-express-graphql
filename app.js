const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');
const config = require('./config');

const {
    bookType,
    genreType,
    authorType
} = require('./graphql/types');

const {
    bookResolvers,
    genreResolvers,
    authorResolvers
} = require('./graphql/resolvers');

const typeDefs = gql`
  type Query { 
    _empty: String
  }

  type Mutation {
    _empty: String  
  }
`;

const server = new ApolloServer({
    typeDefs: [typeDefs, bookType, genreType, authorType],
    resolvers: [bookResolvers, genreResolvers, authorResolvers],
    debug: false
});

const app = express();

app.use(cors());

server.applyMiddleware({app});

app.listen({port: config.port}, () =>
    console.log(`Now browse to http://localhost:${config.port}${server.graphqlPath}`)
);
