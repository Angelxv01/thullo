import { gql } from 'apollo-server';

const typeDefs = gql`
  enum Visibility {
    PRIVATE
    PUBLIC
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
