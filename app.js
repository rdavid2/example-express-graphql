import express from 'express';
import cors from 'cors';
import config from './config.js';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {AuthorType, BookType, GenreType} from "./graphql/types/index.js";
import {authorResolvers, bookResolvers, genreResolvers} from "./graphql/resolvers/index.js";
import http from 'http';

const TypeDefs = `#graphql
  type Query { 
    _empty: String
  }

  type Mutation {
    _empty: String  
  }
`;

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: [TypeDefs, BookType, GenreType, AuthorType],
    resolvers: [bookResolvers, genreResolvers, authorResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    includeStacktraceInErrorResponses: false
});

await server.start();

app.use(
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({req}) => ({
            //token: req.headers.token
        }),
    }),
)

await new Promise((resolve) => httpServer.listen({port: config.port}, resolve));

console.log(`Server ready at http://localhost:${config.port}/graphql`);
