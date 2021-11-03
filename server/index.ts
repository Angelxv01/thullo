import {ApolloServer} from 'apollo-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import Logger from '../utils/Logger';
import config from '../utils/config';
import schema from './graphql/schema';
// import schema from './gql/schema';
import User from './models/User';
import {IUser} from '../types';
import createDataLoader from './utils/createDataLoaders';

mongoose
  .connect(config.MONGODB || '')
  .then(() => Logger.info('connected to MongoDB'))
  .catch(err => Logger.error(err));
mongoose.set('debug', true);

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    const dataLoader = createDataLoader();
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decoded = jwt.verify(auth.substr(7), config.SECRET) as {id: string};
      const currentUser: IUser = (await User.findById(decoded.id)) as IUser;
      return {currentUser, dataLoader};
    }
    return {dataLoader};
  },
});
void server.listen().then(({url}) => Logger.info(`Server ready at ${url}`));
