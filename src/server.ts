import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { createConnection } from 'typeorm';
import { User } from './models';


(async () => {
  try {
    const connection = await createConnection();
    if (!connection.isConnected) {
      throw Error('connection error');
    }
    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(7)],
      context: async ({req}) => {
        const token = req.headers.authorization;
        if (token === undefined) return { currentUser: null };
        const me = await connection.getRepository(User).findOne({ token });
        return { me };
      }
    });

    const app = express();
    app.use('*', cors());
    app.use(compression());
    server.applyMiddleware({ app, path: '/graphql' });
    const httpServer = createServer(app);
    httpServer.listen(
      { port: 3000 },
      (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
    );
  } catch (err) {
    console.error('!!! start app error', err);
  }
})();
