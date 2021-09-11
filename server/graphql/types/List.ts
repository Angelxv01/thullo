import {gql} from 'apollo-server';

const typeDefs = gql`
  type List {
    id: ID!
    name: String
    cards: [Card!]!
  }
`;

const resolvers = {};

export default {typeDefs, resolvers};
