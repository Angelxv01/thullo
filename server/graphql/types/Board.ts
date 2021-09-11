import {gql} from 'apollo-server';

const typeDefs = gql`
  type Board {
    id: ID!
    title: String!
    visibility: Visibility!
    description: String!
    lists: [List!]!
    coverId: String!
  }
`;

const resolvers = {};

export default {typeDefs, resolvers};
