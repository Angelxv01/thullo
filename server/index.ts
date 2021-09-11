import {ApolloServer} from 'apollo-server';
import {connect} from 'mongoose';

import Logger from '../utils/Logger';
import config from '../utils/config';
import schema from './graphql/schema';

connect(config.MONGODB || '')
  .then(() => Logger.info('connected to MongoDB'))
  .catch(err => Logger.error(err));

const server = new ApolloServer({schema});
void server.listen().then(({url}) => Logger.info(`Server ready at ${url}`));
