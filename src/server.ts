import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
const models = require('../models');

const app = express();

// const server = new ApolloServer({
//   schema,
//   validationRules: [depthLimit(7)],
//   context: ({ req }) => {
//     console.log(req.headers.authorization);
//   }
// });

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: async ({req}) => {
    const token = req.headers.authorization;
    let currentUser = null;
    if (token !== undefined) {
      const allusers = await models.User.findAll({ where: { token } });
      currentUser = allusers[0].dataValues;
    }
    return { models, currentUser };
  }
});

app.use('*', cors());

app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen(
  { port: 3000 },
  (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
);