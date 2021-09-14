import {ApolloServer} from 'apollo-server';
import {connect} from 'mongoose';
import jwt from 'jsonwebtoken';

import Logger from '../utils/Logger';
import config from '../utils/config';
import schema from './graphql/schema';
import User from './models/User';

connect(config.MONGODB || '')
  .then(() => Logger.info('connected to MongoDB'))
  .catch(err => Logger.error(err));

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decoded = jwt.verify(auth.substr(7), config.SECRET) as {id: string};
      const currentUser = await User.findById(decoded.id);
      return {currentUser};
    }
  },
});
void server.listen().then(({url}) => Logger.info(`Server ready at ${url}`));
