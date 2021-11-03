import {gql} from 'apollo-server';
import { IUser } from '../../../types';
import User from '../../models/User';

const typeDefs = gql`
  extend type Query {
    allUser: [User!]!
    authorizedUser: User
  }
`;

const resolvers = {
  Query: {
    allUser: async () => User.find(),
    authorizedUser: (
      _root: never, _args: never, context: {currentUser: IUser}
    ) => context.currentUser,
  },
};

export default {typeDefs, resolvers};
