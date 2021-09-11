import {gql} from 'apollo-server';
import List from '../../models/List';

const typeDefs = gql`
  extend type Query {
    listCount: Int!
    allLists: [List!]!
    list(id: ID!): List!
  }
`;

const resolvers = {
  Query: {
    listCount: async () => await List.count(),
    allLists: async () => await List.find().populate('cards'),
    list: async (_root: never, args: {id: String}) =>
      await List.findById(args.id).populate('cards'),
  },
};

export default {typeDefs, resolvers};
