import {gql} from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    authorizedUser: User
  }
`;

const resolvers = {
  Query: {
    authorizedUser: (
      _root: never,
      _args: never,
      context: {currentUser: String}
    ) => context.currentUser,
  },
};

export default {typeDefs, resolvers};
