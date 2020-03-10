import * as typeDefs from './user-schema.graphql';
import resolvers from './user-resolvers';

import { makeExecutableSchema, gql } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

export const userSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
