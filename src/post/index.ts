import * as typeDefs from './post-schema.graphql';
import resolvers from './post-resolvers';

import { makeExecutableSchema, gql } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

export const postSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
