import {ApolloServer} from 'apollo-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import Logger from '../utils/Logger';
import {MONGODB, SECRET} from '../utils/config';
import schema from './graphql/schema';
import User from './models/User';
import {UserDocument} from '../types';
import createDataLoader, {Dataloaders} from './utils/createDataLoaders';

mongoose
  .connect(MONGODB || '')
  .then(() => Logger.info('connected to MongoDB'))
  .catch(err => Logger.error(err));
mongoose.set('debug', true);

export interface Context {
  currentUser?: UserDocument;
  dataLoader: ReturnType<Dataloaders>;
}

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    const dataLoader = createDataLoader();
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const {id} = jwt.verify(auth.substr(7), SECRET) as Record<string, string>;
      const currentUser = await User.findById(id);
      return {currentUser, dataLoader};
    }
    return {dataLoader};
  },
});
void server.listen().then(({url}) => Logger.info(`Server ready at ${url}`));
