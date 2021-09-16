import {gql} from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    boards: [Board!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Token {
    value: String!
  }
`;

const resolvers = {};

export default {typeDefs, resolvers};
