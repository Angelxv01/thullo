import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import Logger from '../utils/Logger';
import { MONGODB, SECRET } from './utils/config';
import schema from './graphql/schema';
import User from './models/User';
import { UserDocument } from './types';
import createDataLoader, { Dataloaders } from './utils/createDataLoaders';

import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';

mongoose
  .connect(MONGODB || '')
  .then(() => Logger.info('connected to MongoDB'))
  .catch(err => Logger.error(err));
mongoose.set('debug', true);

export interface Context {
  currentUser?: UserDocument;
  dataLoader: ReturnType<Dataloaders>;
}

async function startServer() {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      const dataLoader = createDataLoader();
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const { id } = jwt.verify(auth.substring(7), SECRET) as Record<
          string,
          string
        >;
        const currentUser = await User.findById(id);
        return { currentUser, dataLoader };
      }
      return { dataLoader };
    },
  });

  await server.start();
  const app = express();
  app.use(graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 1 }));
  server.applyMiddleware({ app });
  await new Promise<void>(r => app.listen({ port: 4000 }, r));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
startServer();
