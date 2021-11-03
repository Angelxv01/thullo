import {gql} from 'apollo-server';
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
      _root: never, _args: never, context: {currentUser: String}
    ) => context.currentUser,
  },
};

export default {typeDefs, resolvers};
