import 'graphql-import-node';
import * as typeDefs from './schema.graphql';
import resolvers from './resolvers';

import { makeExecutableSchema, gql } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;

