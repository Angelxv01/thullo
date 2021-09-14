import {gql} from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    boards: [Board!]
  }

  type Token {
    value: String!
  }
`;

const resolvers = {};

export default {typeDefs, resolvers};
