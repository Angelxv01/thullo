import { gql } from 'apollo-server';

const typeDefs = gql`
  enum Role {
    OWNER
    ADMIN
    MEMBER
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
